'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import ShopCard from '@/components/ShopCard';
import Breadcrumb from '@/components/Breadcrumb';
import ServiceFilter from '@/components/ServiceFilter';
import Link from 'next/link';
import Script from 'next/script';
import { calculateDistance, shopMatchesServices } from '@/lib/utils';

// Dynamic import for Map component (doesn't work with SSR)
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function CityPage() {
  const params = useParams();
  const provinceSlug = params.province as string;
  const citySlug = params.city as string;

  const [shops, setShops] = useState<TireShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'distance'>('name');
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [showMap, setShowMap] = useState(false);

  // Convert slugs to proper names (decode URL encoding first)
  const provinceName = decodeURIComponent(provinceSlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const cityName = decodeURIComponent(citySlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get user location for distance calculation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Silently fail - distance sorting just won't be available
        }
      );
    }
  }, []);

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        setError(null);

        // Fetch shops for this city and province
        const { data, error: shopsError } = await supabase
          .from('listings')
          .select('*')
          .ilike('state', provinceName)
          .ilike('city', cityName)
          .order('name', { ascending: true });

        if (shopsError) throw shopsError;

        setShops(data || []);
      } catch (err) {
        console.error('Error fetching shops:', err);
        setError('Failed to load tire shops. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, [provinceName, cityName]);

  // Filter and sort shops
  const filteredShops = useMemo(() => {
    let filtered = shops;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((shop) =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.full_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.postal_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false
      );
    }

    // Apply service filter
    if (selectedServices.length > 0) {
      filtered = filtered.filter(shop => shopMatchesServices(shop, selectedServices));
    }

    // Add distance to shops if user location is available
    const shopsWithDistance = filtered.map(shop => ({
      ...shop,
      distance: shop.latitude && shop.longitude && userLocation
        ? calculateDistance(userLocation.lat, userLocation.lon, shop.latitude, shop.longitude)
        : undefined
    }));

    // Sort shops
    if (sortBy === 'distance' && userLocation) {
      return shopsWithDistance.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
    }

    return shopsWithDistance.sort((a, b) => a.name.localeCompare(b.name));
  }, [shops, searchTerm, selectedServices, sortBy, userLocation]);

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Generate LocalBusiness schema for each shop
  const generateShopSchema = (shop: TireShop) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': shop.name,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': shop.street || shop.full_address,
      'addressLocality': shop.city,
      'addressRegion': shop.state || shop.province_code,
      'postalCode': shop.postal_code,
      'addressCountry': 'CA'
    },
    ...(shop.phone && { 'telephone': shop.phone }),
    ...(shop.site && { 'url': shop.site }),
    ...(shop.latitude && shop.longitude && {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': shop.latitude,
        'longitude': shop.longitude
      }
    })
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Schema Markup for top shops */}
      {shops.slice(0, 10).map((shop, index) => (
        <Script
          key={shop.id}
          id={`shop-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateShopSchema(shop)) }}
        />
      ))}

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: provinceName, href: `/tire-shops/${provinceSlug}` },
          { label: `Tire Shops in ${cityName}` }
        ]}
      />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm text-blue-200 mb-2 font-medium">
              {provinceName}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tire Shops in {cityName}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {shops.length > 0 ? (
                <>Find the best tire shop near you from {shops.length.toLocaleString()} locations in {cityName}</>
              ) : (
                <>Search for tire shops in {cityName}, {provinceName}</>
              )}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search by shop name, address, or postal code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      {shops.length > 0 && (
        <section className="bg-gray-50 py-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{shops.length.toLocaleString()}</div>
                <div className="text-gray-600 font-medium">Tire Shops in {cityName}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {shops.filter(s => s.phone).length}
                </div>
                <div className="text-gray-600 font-medium">With Phone Numbers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {shops.filter(s => s.site).length}
                </div>
                <div className="text-gray-600 font-medium">With Websites</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      {!loading && shops.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <span className="text-3xl mr-2">📍</span>
                Map View
              </h2>
              <button
                onClick={() => setShowMap(!showMap)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
            {showMap && <Map shops={filteredShops} />}
          </div>
        </section>
      )}

      {/* Service Filter Section */}
      {!loading && shops.length > 0 && (
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServiceFilter
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />
          </div>
        </section>
      )}

      {/* Tire Shops Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* View Controls */}
          {shops.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  All Tire Shops
                </h2>
                <div className="text-gray-600 mt-1">
                  Showing {filteredShops.length} of {shops.length} shops
                </div>
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'distance')}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="distance" disabled={!userLocation}>
                    Distance {!userLocation && '(Location required)'}
                  </option>
                </select>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading tire shops...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-red-600 mb-3">Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Results Grid */}
          {!loading && !error && (
            <>
              {filteredShops.length === 0 ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">
                    {shops.length === 0 ? 'No tire shops found in this city' : 'No tire shops match your search'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {shops.length === 0
                      ? `Try browsing tire shops in other cities in ${provinceName}`
                      : 'Try adjusting your search criteria'}
                  </p>
                  <div className="flex gap-4 justify-center">
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                    <Link
                      href={`/tire-shops/${provinceSlug}`}
                      className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Browse All {provinceName} Shops
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      {shops.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Tire Shops in {cityName}, {provinceName}
              </h2>
              <p className="text-gray-700 mb-4">
                Looking for a tire shop in {cityName}? You've come to the right place. TireShopPro.ca features
                {' '}{shops.length} tire shop{shops.length !== 1 ? 's' : ''} in {cityName}, {provinceName},
                making it easy to find tire sales, installation, alignment, and repair services near you.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                Common Tire Services Available in {cityName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>New tire sales (all-season, winter, summer)</li>
                  <li>Tire installation and mounting</li>
                  <li>Wheel alignment and balancing</li>
                  <li>Tire rotation services</li>
                </ul>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Flat tire repair and patching</li>
                  <li>Seasonal tire changeover</li>
                  <li>TPMS sensor service</li>
                  <li>Tire storage options</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                Why Choose a Local Tire Shop in {cityName}?
              </h3>
              <p className="text-gray-700">
                Local tire shops in {cityName} offer personalized service, competitive pricing, and quick turnaround times.
                Many shops offer same-day service for tire installation and repairs. Compare options, read reviews,
                and find a tire shop that meets your specific needs and budget.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Links */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/tire-shops/${provinceSlug}`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              ← Browse All {provinceName} Shops
            </Link>
            <Link
              href="/"
              className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
            >
              Browse All Provinces
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
