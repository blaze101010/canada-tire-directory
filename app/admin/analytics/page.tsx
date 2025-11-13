'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';

interface Analytics {
  shopsByProvince: { province: string; count: number }[];
  shopsByCity: { city: string; province: string; count: number }[];
  ratingDistribution: { rating: number; count: number }[];
  topRatedShops: { name: string; rating: number; reviews: number }[];
  recentActivity: {
    newShops: number;
    newReviews: number;
    updatedHours: number;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    shopsByProvince: [],
    shopsByCity: [],
    ratingDistribution: [],
    topRatedShops: [],
    recentActivity: { newShops: 0, newReviews: 0, updatedHours: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      // Fetch all shops
      const { data: shops, error: shopsError } = await supabase
        .from('listings')
        .select('*');

      if (shopsError) throw shopsError;

      // Fetch all reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('*');

      if (reviewsError) throw reviewsError;

      // Type assertions for data
      const typedShops = (shops || []) as TireShop[];
      const typedReviews = (reviews || []) as any[];

      // Calculate shops by province
      const provinceCounts: { [key: string]: number } = {};
      typedShops.forEach(shop => {
        if (shop.state) {
          provinceCounts[shop.state] = (provinceCounts[shop.state] || 0) + 1;
        }
      });
      const shopsByProvince = Object.entries(provinceCounts)
        .map(([province, count]) => ({ province, count }))
        .sort((a, b) => b.count - a.count);

      // Calculate shops by city (top 10)
      const cityCounts: { [key: string]: { province: string; count: number } } = {};
      typedShops.forEach(shop => {
        if (shop.city && shop.state) {
          const key = `${shop.city}|${shop.state}`;
          if (!cityCounts[key]) {
            cityCounts[key] = { province: shop.state, count: 0 };
          }
          cityCounts[key].count++;
        }
      });
      const shopsByCity = Object.entries(cityCounts)
        .map(([key, data]) => ({
          city: key.split('|')[0],
          province: data.province,
          count: data.count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Calculate rating distribution
      const ratingCounts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      typedReviews.forEach(review => {
        const rating = Math.round(review.rating);
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating]++;
        }
      });
      const ratingDistribution = Object.entries(ratingCounts)
        .map(([rating, count]) => ({ rating: Number(rating), count }))
        .sort((a, b) => a.rating - b.rating);

      // Calculate top rated shops
      const shopsWithRatings = typedShops.filter(s => s.average_rating && s.reviews_count && s.reviews_count >= 3);
      const topRatedShops = shopsWithRatings
        .sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
        .slice(0, 10)
        .map(s => ({
          name: s.name,
          rating: s.average_rating || 0,
          reviews: s.reviews_count || 0,
        }));

      // Calculate recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const newShops = typedShops.filter(s =>
        s.created_at && new Date(s.created_at) > thirtyDaysAgo
      ).length;

      const newReviews = typedReviews.filter(r =>
        r.created_at && new Date(r.created_at) > thirtyDaysAgo
      ).length;

      const updatedHours = typedShops.filter(s =>
        s.hours_last_updated && new Date(s.hours_last_updated) > thirtyDaysAgo
      ).length;

      setAnalytics({
        shopsByProvince,
        shopsByCity,
        ratingDistribution,
        topRatedShops,
        recentActivity: { newShops, newReviews, updatedHours },
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Insights and statistics about your tire shop directory</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity (Last 30 Days)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <p className="text-4xl font-bold text-blue-600">{analytics.recentActivity.newShops}</p>
              <p className="text-sm text-gray-600 mt-2">New Shops Added</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-4xl font-bold text-green-600">{analytics.recentActivity.newReviews}</p>
              <p className="text-sm text-gray-600 mt-2">New Reviews</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <p className="text-4xl font-bold text-purple-600">{analytics.recentActivity.updatedHours}</p>
              <p className="text-sm text-gray-600 mt-2">Hours Updated</p>
            </div>
          </div>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shops by Province */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shops by Province</h2>
            <div className="space-y-3">
              {analytics.shopsByProvince.map((item, index) => {
                const maxCount = analytics.shopsByProvince[0]?.count || 1;
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{item.province}</span>
                      <span className="text-gray-600">{item.count} shops</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Rating Distribution</h2>
            <div className="space-y-3">
              {analytics.ratingDistribution.map((item, index) => {
                const total = analytics.ratingDistribution.reduce((sum, r) => sum + r.count, 0);
                const percentage = total > 0 ? (item.count / total) * 100 : 0;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 flex items-center">
                        {item.rating} Stars
                        <span className="text-yellow-400 ml-1">★</span>
                      </span>
                      <span className="text-gray-600">{item.count} reviews ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top 10 Cities by Shop Count</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.shopsByCity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.city}</p>
                    <p className="text-sm text-gray-600">{item.province}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Rated Shops */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Rated Shops (3+ Reviews)</h2>
          <div className="space-y-3">
            {analytics.topRatedShops.length > 0 ? (
              analytics.topRatedShops.map((shop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{shop.name}</p>
                      <p className="text-sm text-gray-600">{shop.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="font-bold text-gray-900">{shop.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No shops with 3+ reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
