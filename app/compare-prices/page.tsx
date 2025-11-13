'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';

interface TirePrice {
  id: string;
  shop_id: string;
  shop_name: string;
  shop_city: string;
  shop_province: string;
  shop_phone: string;
  shop_rating: number;
  brand_name: string;
  category_name: string;
  size_display: string;
  model_name: string;
  price_per_tire: number;
  installation_price: number | null;
  in_stock: boolean;
  warranty_months: number | null;
}

function ComparePricesContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<TirePrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');
  const [showMap, setShowMap] = useState(false);

  const quantity = parseInt(searchParams.get('quantity') || '4');
  const categoryId = searchParams.get('category');
  const sizeId = searchParams.get('size');
  const brandId = searchParams.get('brand');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const installation = searchParams.get('installation') === 'true';
  const city = searchParams.get('city');
  const province = searchParams.get('province');

  useEffect(() => {
    loadResults();
  }, [searchParams]);

  async function loadResults() {
    setLoading(true);

    try {
      // First, get listing IDs that match the location filters
      let listingIds: string[] = [];

      if (province || city) {
        let locationQuery = supabase
          .from('listings')
          .select('id');

        if (province) locationQuery = locationQuery.eq('state', province);
        if (city) locationQuery = locationQuery.ilike('city', `%${city}%`);

        const { data: matchingListings, error: locationError } = await locationQuery;

        if (locationError) {
          console.error('Error filtering locations:', locationError);
          setResults([]);
          setLoading(false);
          return;
        }

        const typedListings = (matchingListings || []) as TireShop[];
        listingIds = typedListings.map(l => l.id);
        console.log(`Found ${listingIds.length} listings matching province/city filters`);

        // If no listings match the location, return empty results
        if (listingIds.length === 0) {
          console.log('No listings found for the specified location');
          setResults([]);
          setLoading(false);
          return;
        }
      }

      // Now query tire inventory with separate queries for each related table
      let query = supabase
        .from('shop_tire_inventory')
        .select('*')
        .eq('in_stock', true);

      if (categoryId) query = query.eq('category_id', categoryId);
      if (sizeId) query = query.eq('size_id', sizeId);
      if (brandId) query = query.eq('brand_id', brandId);
      if (minPrice) query = query.gte('price_per_tire', parseFloat(minPrice));
      if (maxPrice) query = query.lte('price_per_tire', parseFloat(maxPrice));

      // Note: We'll filter by location after fetching to avoid Supabase .in() limits
      const { data: inventoryData, error: inventoryError } = await query;

      // Filter by listing IDs in JavaScript if needed
      const typedInventory = (inventoryData || []) as any[];
      let filteredInventory = typedInventory;
      if (typedInventory.length > 0 && listingIds.length > 0) {
        const listingIdSet = new Set(listingIds);
        filteredInventory = typedInventory.filter(item => listingIdSet.has(item.listing_id));
        console.log(`Filtered from ${typedInventory.length} to ${filteredInventory.length} items based on location`);
      }

      if (inventoryError) {
        console.error('Error loading tire inventory:', inventoryError);
        console.error('Error details:', JSON.stringify(inventoryError, null, 2));
        setResults([]);
      } else if (!filteredInventory || filteredInventory.length === 0) {
        console.log('No tire inventory found matching criteria');
        setResults([]);
      } else {
        console.log(`Found ${filteredInventory.length} tire inventory items`);

        // Get all unique IDs for related data
        const uniqueListingIds = [...new Set(filteredInventory.map(item => item.listing_id))];
        const uniqueBrandIds = [...new Set(filteredInventory.map(item => item.brand_id))];
        const uniqueCategoryIds = [...new Set(filteredInventory.map(item => item.category_id))];
        const uniqueSizeIds = [...new Set(filteredInventory.map(item => item.size_id))];

        console.log(`Fetching data for ${uniqueListingIds.length} listings, ${uniqueBrandIds.length} brands, ${uniqueCategoryIds.length} categories, ${uniqueSizeIds.length} sizes`);

        // Fetch related data - fetch all and filter in JS to avoid .in() limits
        const [listingsRes, brandsRes, categoriesRes, sizesRes] = await Promise.all([
          // Fetch all listings and filter in JavaScript
          province || city
            ? supabase.from('listings').select('*').in('id', listingIds.slice(0, 1000))
            : supabase.from('listings').select('*').limit(1000),
          supabase.from('tire_brands').select('*'),
          supabase.from('tire_categories').select('*'),
          supabase.from('tire_sizes').select('*'),
        ]);

        console.log('Fetched related data:', {
          listings: listingsRes.data?.length,
          brands: brandsRes.data?.length,
          categories: categoriesRes.data?.length,
          sizes: sizesRes.data?.length,
        });

        // Create lookup maps
        const listingsMap = new Map((listingsRes.data as any[] || []).map(l => [l.id, l]));
        const brandsMap = new Map((brandsRes.data as any[] || []).map(b => [b.id, b]));
        const categoriesMap = new Map((categoriesRes.data as any[] || []).map(c => [c.id, c]));
        const sizesMap = new Map((sizesRes.data as any[] || []).map(s => [s.id, s]));

        // Transform the data
        const transformed = filteredInventory
          .map((item: any) => {
            const listing = listingsMap.get(item.listing_id);
            const brand = brandsMap.get(item.brand_id);
            const category = categoriesMap.get(item.category_id);
            const size = sizesMap.get(item.size_id);

            if (!listing || !brand || !category || !size) return null;

            return {
              id: item.id,
              shop_id: listing.id,
              shop_name: listing.name,
              shop_city: listing.city,
              shop_province: listing.state,
              shop_phone: listing.phone,
              shop_rating: listing.rating || 0,
              brand_name: brand.name,
              category_name: category.name,
              size_display: size.display_name,
              model_name: item.model_name,
              price_per_tire: item.price_per_tire,
              installation_price: item.installation_price,
              in_stock: item.in_stock,
              warranty_months: item.warranty_months,
            };
          })
          .filter(item => item !== null);

        console.log(`Successfully transformed ${transformed.length} results`);
        setResults(transformed as TirePrice[]);
      }
    } catch (error) {
      console.error('Error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') {
      const totalA = a.price_per_tire * quantity + (installation && a.installation_price ? a.installation_price * quantity : 0);
      const totalB = b.price_per_tire * quantity + (installation && b.installation_price ? b.installation_price * quantity : 0);
      return totalA - totalB;
    } else {
      return (b.shop_rating || 0) - (a.shop_rating || 0);
    }
  });

  function getTotalPrice(result: TirePrice) {
    const tireTotal = result.price_per_tire * quantity;
    const installTotal = installation && result.installation_price ? result.installation_price * quantity : 0;
    return tireTotal + installTotal;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Finding the best prices...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Compare Tire Prices
              </h1>
              <p className="text-gray-600">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
                {province && ` in ${province}`}
              </p>
            </div>
            <Link
              href="/find-tires"
              className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:border-blue-600 transition-colors"
            >
              🔄 New Search
            </Link>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="price">Lowest Price</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <span className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold">
                {quantity} tires
              </span>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">😕</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Results Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any tire shops matching your criteria. Try adjusting your filters or search in a different area.
            </p>
            <Link
              href="/find-tires"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Different Search
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedResults.map((result, index) => (
              <div key={result.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Badge for best deal */}
                      {index === 0 && sortBy === 'price' && (
                        <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                          🏆 BEST PRICE
                        </div>
                      )}
                      {index === 0 && sortBy === 'rating' && (
                        <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                          ⭐ TOP RATED
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {result.shop_name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        📍 {result.shop_city}, {result.shop_province}
                        {result.shop_rating > 0 && (
                          <span className="ml-3">
                            ⭐ {result.shop_rating.toFixed(1)}
                          </span>
                        )}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Tire Details</p>
                          <p className="font-medium text-gray-900">
                            {result.brand_name} {result.model_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {result.size_display} • {result.category_name}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">Features</p>
                          <div className="flex flex-wrap gap-2">
                            {result.warranty_months && (
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                {result.warranty_months} mo warranty
                              </span>
                            )}
                            {result.in_stock && (
                              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                                ✓ In Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">Price per tire:</span>
                          <span className="font-semibold">${result.price_per_tire.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700">{quantity} tires:</span>
                          <span className="font-semibold">${(result.price_per_tire * quantity).toFixed(2)}</span>
                        </div>
                        {installation && result.installation_price && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700">Installation ({quantity} tires):</span>
                            <span className="font-semibold">${(result.installation_price * quantity).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-gray-300 mt-2 pt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total:</span>
                            <span className="text-2xl font-bold text-blue-600">
                              ${getTotalPrice(result).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="ml-6 flex flex-col gap-3">
                      <a
                        href={`tel:${result.shop_phone}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center whitespace-nowrap"
                      >
                        📞 Call Shop
                      </a>
                      <Link
                        href={`/tire-shops/${result.shop_province.toLowerCase().replace(/ /g, '-')}/${result.shop_id}`}
                        className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 transition-colors text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Savings Banner */}
        {results.length >= 2 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">💰</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Save by comparing prices!
                </h3>
                <p className="text-gray-700">
                  Price difference between highest and lowest:
                  <span className="font-bold text-green-600 ml-2">
                    ${(getTotalPrice(sortedResults[sortedResults.length - 1]) - getTotalPrice(sortedResults[0])).toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComparePricesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <ComparePricesContent />
    </Suspense>
  );
}
