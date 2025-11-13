'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import ShopCard from '@/components/ShopCard';
import SchemaMarkup from '@/components/SchemaMarkup';
import Header from '@/components/Header';
import Link from 'next/link';
import { debounce } from '@/lib/performance';

// Statistics will be fetched from database
interface Stats {
  totalShops: number;
  provinces: number;
  cities: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [shops, setShops] = useState<TireShop[]>([]);
  const [stats, setStats] = useState<Stats>({ totalShops: 0, provinces: 0, cities: 0 });
  const [provinceStats, setProvinceStats] = useState<{ name: string; count: number }[]>([]);
  const [cityStats, setCityStats] = useState<{ city: string; province: string; count: number }[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(500); // Start with 500 shops

  // Advanced filters
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'reviews'>('name');
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search to reduce API calls
  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 500),
    []
  );

  const handleSearch = () => {
    if (searchTerm && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Fetch statistics and top cities/provinces on mount
  useEffect(() => {
    async function fetchStats() {
      try {
        setStatsLoading(true);
        setError(null);

        // Fetch only state and city for statistics (much lighter query)
        // Note: Supabase has a default limit of 1000, so we need to fetch in batches or set a high limit
        let allData: any[] = [];
        let from = 0;
        const batchSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data, error: statsError } = await supabase
            .from('listings')
            .select('state, city')
            .not('state', 'is', null)
            .not('city', 'is', null)
            .range(from, from + batchSize - 1);

          if (statsError) throw statsError;

          if (data && data.length > 0) {
            allData = [...allData, ...data];
            from += batchSize;
            hasMore = data.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        // Calculate statistics
        const uniqueProvinces = [...new Set(allData.map(s => s.state).filter(Boolean))];
        const uniqueCities = [...new Set(allData.map(s => s.city).filter(Boolean))];

        // Count shops per province
        const provinceCounts: { [key: string]: number } = {};
        allData.forEach(shop => {
          if (shop.state) {
            provinceCounts[shop.state] = (provinceCounts[shop.state] || 0) + 1;
          }
        });

        const topProvinces = Object.entries(provinceCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);

        // Count shops per city (with province info)
        const cityCounts: { [key: string]: { province: string; count: number } } = {};
        allData.forEach(shop => {
          if (shop.city && shop.state) {
            const key = `${shop.city}|${shop.state}`;
            if (!cityCounts[key]) {
              cityCounts[key] = { province: shop.state, count: 0 };
            }
            cityCounts[key].count++;
          }
        });

        const topCities = Object.entries(cityCounts)
          .map(([key, data]) => ({
            city: key.split('|')[0],
            province: data.province,
            count: data.count
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 12); // Get top 12 cities for better grid display

        setStats({
          totalShops: allData.length,
          provinces: uniqueProvinces.length,
          cities: uniqueCities.length
        });

        setProvinceStats(topProvinces);
        setCityStats(topCities);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setStatsLoading(false);
      }
    }

    fetchStats();
  }, []);

  // Trigger debounced search when user types
  useEffect(() => {
    debouncedSetSearch(searchTerm);
  }, [searchTerm, debouncedSetSearch]);

  // Reset limit when search criteria change
  useEffect(() => {
    setCurrentLimit(500);
  }, [debouncedSearchTerm, selectedProvince]);

  // Fetch shops only when user searches (using debounced term)
  useEffect(() => {
    async function fetchShops() {
      if (!debouncedSearchTerm && !selectedProvince) {
        // Don't fetch shops if no search criteria
        setShops([]);
        setShopsLoading(false);
        setShowFilters(false);
        setHasMore(false);
        return;
      }

      try {
        setShopsLoading(true);
        setError(null);
        setShowFilters(true); // Auto-show filters when search is performed

        let query = supabase
          .from('listings')
          .select('*', { count: 'exact' })
          .order('name', { ascending: true })
          .limit(currentLimit);

        // Apply filters
        if (selectedProvince) {
          query = query.ilike('state', selectedProvince);
        }

        if (debouncedSearchTerm) {
          // For postal code search, handle both with and without spaces
          // Canadian postal codes: "M5V 3A8" or "M5V3A8"
          const searchWithSpace = debouncedSearchTerm.replace(/([A-Z0-9]{3})([A-Z0-9]{3})/i, '$1 $2');
          const searchWithoutSpace = debouncedSearchTerm.replace(/\s+/g, '');

          query = query.or(`name.ilike.%${debouncedSearchTerm}%,city.ilike.%${debouncedSearchTerm}%,full_address.ilike.%${debouncedSearchTerm}%,postal_code.ilike.%${debouncedSearchTerm}%,postal_code.ilike.%${searchWithSpace}%,postal_code.ilike.%${searchWithoutSpace}%`);
        }

        const { data, error: shopsError, count } = await query;

        if (shopsError) throw shopsError;

        setShops(data || []);
        setHasMore((count || 0) > (data?.length || 0));

      } catch (err) {
        console.error('Error fetching shops:', err);
        setError('Failed to load tire shops. Please try again later.');
      } finally {
        setShopsLoading(false);
      }
    }

    fetchShops();
  }, [debouncedSearchTerm, selectedProvince, currentLimit]);

  // Load more shops
  const loadMoreShops = () => {
    setCurrentLimit(prev => prev + 500);
  };

  // Apply client-side filters and sorting
  const filteredShops = useMemo(() => {
    let result = [...shops];

    // Filter by minimum rating
    if (minRating > 0) {
      result = result.filter(shop => (shop.average_rating || 0) >= minRating);
    }

    // Filter by verified status
    if (verifiedOnly) {
      result = result.filter(shop => shop.is_verified === true);
    }

    // Filter by open now status
    if (openNow) {
      result = result.filter(shop => shop.is_open_now === true);
    }

    // Sort results
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.average_rating || 0) - (a.average_rating || 0);
        case 'reviews':
          return (b.reviews_count || 0) - (a.reviews_count || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [shops, minRating, verifiedOnly, openNow, sortBy]);

  // Get province list from provinceStats for the filter dropdown
  const provinces = useMemo(() => {
    return provinceStats.map(p => p.name).sort();
  }, [provinceStats]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header totalShops={stats.totalShops} activeVisitors={1250} />

      {/* Schema Markup for SEO */}
      <SchemaMarkup type="website" />
      <SchemaMarkup
        type="itemlist"
        data={{
          totalShops: stats.totalShops,
          cities: cityStats
        }}
      />
      <SchemaMarkup type="faqpage" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find a Tire Shop Near Me
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover {stats.totalShops.toLocaleString()}+ tire shops across Canada.
              Compare prices, services, and find the best tire shop in your area.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search by city, postal code, or shop name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-100 shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {stats.totalShops.toLocaleString()}+
              </div>
              <div className="text-gray-700 font-semibold text-lg">Tire Shops</div>
              <div className="text-gray-500 text-sm mt-2">Across Canada</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-2 border-orange-100 shadow-lg">
              <div className="text-5xl font-bold text-orange-600 mb-2">
                {stats.provinces}
              </div>
              <div className="text-gray-700 font-semibold text-lg">Provinces</div>
              <div className="text-gray-500 text-sm mt-2">Complete Coverage</div>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 shadow-lg">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {stats.cities}+
              </div>
              <div className="text-gray-700 font-semibold text-lg">Cities</div>
              <div className="text-gray-500 text-sm mt-2">And Growing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Finder CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl">🔍</span>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    NEW FEATURE
                  </span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Compare Tire Prices & Find the Best Deal
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Tell us what type of tires you need, and we'll show you prices from shops in your area.
                  Save money by comparing before you buy!
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Compare Prices Side-by-Side</p>
                      <p className="text-sm text-gray-600">See all available options at a glance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">Filter by Brand & Size</p>
                      <p className="text-sm text-gray-600">Find exactly what you're looking for</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900">See Installation Prices</p>
                      <p className="text-sm text-gray-600">Get the complete cost upfront</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/find-tires"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  🎯 Find Best Tire Prices →
                </Link>
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 lg:p-12 flex items-center justify-center">
                <div className="space-y-4 w-full max-w-md">
                  {/* Sample comparison cards */}
                  <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Best Price Shop</span>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                        BEST DEAL
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-blue-600">$89.99</span>
                      <span className="text-sm text-gray-500">per tire</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Michelin All-Season • 215/60R16</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 opacity-75">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Shop #2</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-700">$109.99</span>
                      <span className="text-sm text-gray-500">per tire</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Michelin All-Season • 215/60R16</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-4 opacity-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Shop #3</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-700">$124.99</span>
                      <span className="text-sm text-gray-500">per tire</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Michelin All-Season • 215/60R16</p>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-green-800">
                      💰 Save up to $140 on 4 tires!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cities Section */}
      {cityStats.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Browse Tire Shops by City
              </h2>
              <p className="text-xl text-gray-600">
                Find tire shops in popular Canadian cities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cityStats.map((city) => {
                const provinceSlug = city.province.toLowerCase().replace(/\s+/g, '-');
                const citySlug = city.city.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={`${city.city}-${city.province}`}
                    href={`/tire-shops/${provinceSlug}/${citySlug}`}
                    className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer block"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">Tire Shop {city.city}</h3>
                      <span className="text-2xl">📍</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {city.count} tire shops
                    </p>
                    <div className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                      View Directory
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Use TireShopPro.ca?
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted source for finding tire shops near you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border-2 border-blue-200">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Comprehensive Directory
              </h3>
              <p className="text-gray-700">
                Access Canada's largest database of tire shops with detailed information on services, hours, and contact details.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border-2 border-green-200">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Verified Information
              </h3>
              <p className="text-gray-700">
                All tire shops are verified with accurate addresses, phone numbers, and service offerings to save you time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border-2 border-orange-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Quick & Easy Search
              </h3>
              <p className="text-gray-700">
                Find tire shops by location, services offered, or shop name. Get results in seconds with our smart search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Tire Services
            </h2>
            <p className="text-xl text-gray-600">
              What you can find at tire shops near you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Tire Installation', icon: '🔧', slug: 'tire-installation' },
              { name: 'Wheel Alignment', icon: '⚖️', slug: 'wheel-alignment' },
              { name: 'Tire Repair', icon: '🛠️', slug: 'tire-repair' },
              { name: 'Winter Tires', icon: '❄️', slug: 'winter-tires' },
              { name: 'Tire Rotation', icon: '🔄', slug: 'tire-rotation' },
              { name: 'Tire Balancing', icon: '⚙️', slug: 'tire-balancing' },
              { name: 'Oil Change', icon: '🛢️', slug: 'oil-change' },
              { name: 'Brake Service', icon: '🛑', slug: 'brake-service' },
              { name: 'Inspections', icon: '📋', slug: 'inspections' },
              { name: 'Tire Storage', icon: '📦', slug: 'tire-storage' }
            ].map((service) => (
              <Link
                key={service.name}
                href={`/services/${service.slug}`}
                className="bg-white rounded-lg p-4 text-center border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-3xl mb-2">{service.icon}</div>
                <div className="text-sm font-semibold text-gray-700">{service.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results Section - Only show when there's a search/filter */}
      {(debouncedSearchTerm || selectedProvince) && (
        <section ref={resultsRef} className="py-16 bg-white" id="search-results">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with Filter Toggle */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  Showing {filteredShops.length} tire shop{filteredShops.length !== 1 ? 's' : ''}
                  {minRating > 0 && ` • ${minRating}+ stars`}
                  {verifiedOnly && ' • Verified only'}
                  {openNow && ' • Open now'}
                </p>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Province Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Province
                    </label>
                    <select
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="">All Provinces</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>

                  {/* Minimum Rating Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="0">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'reviews')}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white cursor-pointer focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="rating">Highest Rated</option>
                      <option value="reviews">Most Reviews</option>
                    </select>
                  </div>

                  {/* Shop Status Toggles */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Shop Status
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={verifiedOnly}
                          onChange={(e) => setVerifiedOnly(e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-sm font-medium">Verified Only</span>
                      </label>
                      <label className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={openNow}
                          onChange={(e) => setOpenNow(e.target.checked)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-gray-700 text-sm font-medium">Open Now</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(minRating > 0 || verifiedOnly || openNow || sortBy !== 'name' || selectedProvince) && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <button
                      onClick={() => {
                        setMinRating(0);
                        setVerifiedOnly(false);
                        setOpenNow(false);
                        setSortBy('name');
                        setSelectedProvince('');
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {shopsLoading && (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading tire shops...</p>
              </div>
            )}

            {/* Error State */}
            {error && !shopsLoading && (
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
            {!shopsLoading && !error && (
              <>
                {filteredShops.length === 0 ? (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No tire shops found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredShops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center mt-8">
                        <button
                          onClick={loadMoreShops}
                          disabled={shopsLoading}
                          className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {shopsLoading ? 'Loading...' : `Load More Shops (${shops.length} of many)`}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* Educational Content Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Finding the Right Tire Shop Near You
          </h2>

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="bg-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Smart Shopping Tips</h3>
              <ul className="space-y-2">
                <li>✓ Compare prices at multiple tire shops in your area</li>
                <li>✓ Check for seasonal promotions and package deals</li>
                <li>✓ Verify warranty coverage and service guarantees</li>
                <li>✓ Read customer reviews and ratings</li>
                <li>✓ Ask about installation costs and additional fees</li>
              </ul>
            </div>

            <div className="bg-blue-800/50 rounded-xl p-6 border-l-4 border-yellow-400">
              <p className="text-lg">
                <strong className="text-yellow-400">Pro Tip:</strong> Many tire shops offer free services like tire rotation,
                flat repairs, and seasonal changeovers with tire purchases. Always ask about included services before making your decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about finding tire shops in Canada
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How do I find a tire shop near me?
              </h3>
              <p className="text-gray-700">
                Finding a tire shop near you is easy with TireShopPro.ca. Simply use our search bar at the top of the page to search by your city, postal code, or shop name. You can also browse our directory by province or select from our list of popular cities. We have {stats.totalShops.toLocaleString()}+ tire shops listed across Canada, making it simple to find options in your area.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What services do tire shops typically offer?
              </h3>
              <p className="text-gray-700 mb-3">
                Most tire shops in Canada offer a comprehensive range of services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>New tire sales (all-season, winter, summer, and performance tires)</li>
                <li>Tire installation and mounting</li>
                <li>Wheel alignment and balancing</li>
                <li>Tire rotation and pressure checks</li>
                <li>Flat tire repair and patching</li>
                <li>Seasonal tire changeover</li>
                <li>Tire storage services</li>
                <li>TPMS (Tire Pressure Monitoring System) service</li>
                <li>Brake inspections and repairs</li>
                <li>Oil changes and general maintenance</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How often should I replace my tires?
              </h3>
              <p className="text-gray-700">
                Generally, tires should be replaced every 6 years or when the tread depth reaches 2/32 of an inch (1.6mm). However, this can vary based on driving habits, road conditions, and tire quality. Most tire shops recommend checking your tread depth regularly and replacing tires sooner if you notice uneven wear, cracks, bulges, or if your tires are more than 10 years old regardless of tread depth. Winter tires should be replaced when tread depth reaches 6/32 of an inch for optimal winter performance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do I need winter tires in Canada?
              </h3>
              <p className="text-gray-700">
                While winter tires are not legally required in all Canadian provinces, they are highly recommended for safety. Quebec legally requires winter tires from December 1 to March 15. Even in other provinces, winter tires significantly improve traction, braking, and handling in cold weather (below 7°C/45°F), snow, and ice. Many insurance companies also offer discounts for using winter tires. Most tire shops in our directory can help you select and install the right winter tires for your vehicle and driving conditions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How much does tire installation cost?
              </h3>
              <p className="text-gray-700">
                Tire installation costs in Canada typically range from $15 to $45 per tire, depending on the shop and your location. This usually includes mounting, balancing, valve stems, and disposal of old tires. Some tire shops offer package deals that include alignment or tire storage. Premium services like road hazard warranties or nitrogen filling may cost extra. We recommend contacting tire shops in your area through our directory to get specific quotes and compare prices.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Can tire shops repair a flat tire?
              </h3>
              <p className="text-gray-700">
                Yes, most tire shops can repair flat tires if the damage is repairable. Punctures in the tread area that are smaller than 1/4 inch (6mm) can usually be repaired safely. However, damage to the sidewall, large punctures, or tires with significant wear cannot be repaired and will need replacement. Tire repair typically costs $20-$30 and can be done while you wait at most shops. Always have a professional inspect your flat tire to determine if repair or replacement is the safer option.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Should I buy tires online or from a tire shop?
              </h3>
              <p className="text-gray-700">
                Both options have advantages. Buying from a local tire shop often includes installation, warranty support, and personalized service. You can inspect tires before purchase and get expert recommendations. Online purchases may offer lower prices but require separate installation arrangements. Many tire shops in our directory offer price matching and competitive deals. We recommend getting quotes from local shops first – the convenience, professional installation, and ongoing support often outweigh small price differences.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What's the difference between all-season and winter tires?
              </h3>
              <p className="text-gray-700">
                All-season tires are designed for year-round use in moderate climates with rubber compounds that perform well in temperatures above 7°C (45°F). Winter tires (also called snow tires) have specialized rubber compounds that stay flexible in freezing temperatures, deeper tread patterns for snow traction, and thousands of tiny grooves (sipes) for ice grip. In Canadian winters, winter tires provide significantly better braking, acceleration, and handling in snow and ice compared to all-season tires. Visit a tire shop in our directory to see winter tire options for your vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cities Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Tire Shop Locations
            </h2>
            <p className="text-xl text-gray-600">
              Find tire shops in Canada's largest cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityStats.slice(0, 6).map((city) => {
              const provinceSlug = city.province.toLowerCase().replace(/\s+/g, '-');
              const citySlug = city.city.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={`${city.city}-${city.province}`}
                  href={`/tire-shops/${provinceSlug}/${citySlug}`}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1 block"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {city.city}
                    </h3>
                    <span className="text-3xl">📍</span>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {city.province}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-blue-600">
                      {city.count}
                    </span>
                    <span className="text-sm text-gray-600">tire shops</span>
                  </div>
                  <div className="mt-4 text-blue-600 font-semibold flex items-center">
                    View All Tire Shops
                    <span className="ml-2">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Find Your Tire Shop?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start browsing {stats.totalShops.toLocaleString()}+ tire shops across Canada
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl"
          >
            Search for Tire Shops
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Tire Tips</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/add-shop" className="hover:text-white transition-colors">Add Your Shop</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Browse by Province</h3>
              <ul className="space-y-2 text-gray-400">
                {provinceStats.map(province => {
                  const provinceSlug = province.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={province.name}>
                      <Link
                        href={`/tire-shops/${provinceSlug}`}
                        className="hover:text-white transition-colors"
                      >
                        {province.name} ({province.count})
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Popular Cities</h3>
              <ul className="space-y-2 text-gray-400">
                {cityStats.slice(0, 8).map(city => {
                  const provinceSlug = city.province.toLowerCase().replace(/\s+/g, '-');
                  const citySlug = city.city.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={`${city.city}-${city.province}`}>
                      <Link
                        href={`/tire-shops/${provinceSlug}/${citySlug}`}
                        className="hover:text-white transition-colors"
                      >
                        Tire Shop {city.city}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
                <li><Link href="/services/tire-installation" className="hover:text-white transition-colors">Tire Installation</Link></li>
                <li><Link href="/services/wheel-alignment" className="hover:text-white transition-colors">Wheel Alignment</Link></li>
                <li><Link href="/services/winter-tires" className="hover:text-white transition-colors">Winter Tires</Link></li>
                <li><Link href="/services/tire-repair" className="hover:text-white transition-colors">Tire Repair</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">TireShopPro.ca</h3>
              <p className="text-gray-400">
                Your trusted source for finding tire shops across Canada. Find the best tire shop near you.
              </p>
            </div>

            <div className="text-center text-gray-400">
              <p>&copy; 2025 TireShopPro.ca | Find a Tire Shop Near Me | All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
