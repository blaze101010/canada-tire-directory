'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import ShopCard from '@/components/ShopCard';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';

export default function ProvincePage() {
  const params = useParams();
  const provinceSlug = params.province as string;

  const [shops, setShops] = useState<TireShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Convert slug to province name (decode URL encoding first)
  const provinceName = decodeURIComponent(provinceSlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        setError(null);

        // Fetch shops for this province
        const { data, error: shopsError } = await supabase
          .from('listings')
          .select('*')
          .ilike('state', provinceName)
          .order('city', { ascending: true })
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
  }, [provinceName]);

  // Get unique cities for this province
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(shops.map(s => s.city).filter(Boolean))];
    return uniqueCities.sort();
  }, [shops]);

  // Get city statistics
  const cityStats = useMemo(() => {
    const cityCounts: { [key: string]: number } = {};
    shops.forEach(shop => {
      if (shop.city) {
        cityCounts[shop.city] = (cityCounts[shop.city] || 0) + 1;
      }
    });

    return Object.entries(cityCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [shops]);

  // Filter shops based on search
  const filteredShops = useMemo(() => {
    if (!searchTerm) return shops;

    return shops.filter((shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.full_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.postal_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false
    );
  }, [shops, searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: `Tire Shops in ${provinceName}` }
        ]}
      />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tire Shops in {provinceName}
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Find the best tire shop near you from {shops.length.toLocaleString()} locations across {cities.length} cities
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search by city, postal code, or shop name..."
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
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{shops.length.toLocaleString()}</div>
              <div className="text-gray-600 font-medium">Tire Shops</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{cities.length}</div>
              <div className="text-gray-600 font-medium">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {cityStats.length > 0 ? cityStats[0].name : '-'}
              </div>
              <div className="text-gray-600 font-medium">Most Popular City</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      {cityStats.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Browse by City
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cityStats.map((city) => {
                const citySlug = city.name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={city.name}
                    href={`/tire-shops/${provinceSlug}/${citySlug}`}
                    className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all text-left block"
                  >
                    <div className="font-bold text-gray-900">{city.name}</div>
                    <div className="text-sm text-gray-600">{city.count} shops</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Tire Shops Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              All Tire Shops in {provinceName}
            </h2>
            <div className="text-gray-600">
              Showing {filteredShops.length} of {shops.length} shops
            </div>
          </div>

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
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No tire shops found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
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
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Finding a Tire Shop in {provinceName}
            </h2>
            <p className="text-gray-700 mb-4">
              Looking for a reliable tire shop in {provinceName}? TireShopPro.ca helps you find the best tire shops
              near you with comprehensive listings across {cities.length} cities. Whether you need new tires, tire installation,
              wheel alignment, or tire repair services, our directory makes it easy to compare options and find the
              right shop for your needs.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
              Popular Tire Services in {provinceName}
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Tire sales and installation</li>
              <li>Wheel alignment and balancing</li>
              <li>Tire rotation and repair</li>
              <li>Seasonal tire changeover</li>
              <li>Brake service and oil changes</li>
              <li>Vehicle inspections</li>
            </ul>

            {cityStats.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">
                  Top Cities for Tire Shops in {provinceName}
                </h3>
                <p className="text-gray-700">
                  Browse tire shops in popular cities including {cityStats.slice(0, 5).map(c => c.name).join(', ')}
                  {cityStats.length > 5 && `, and ${cityStats.length - 5} more cities`}.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Browse All Provinces
          </Link>
        </div>
      </section>
    </div>
  );
}
