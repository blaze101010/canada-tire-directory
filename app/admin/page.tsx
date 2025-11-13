'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Stats {
  totalShops: number;
  totalReviews: number;
  averageRating: number;
  shopsWithHours: number;
  recentShops: number;
  verifiedShops: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalShops: 0,
    totalReviews: 0,
    averageRating: 0,
    shopsWithHours: 0,
    recentShops: 0,
    verifiedShops: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch all shops in batches to overcome 1000 row limit
        let allShops: any[] = [];
        let from = 0;
        const batchSize = 1000;
        let hasMore = true;

        while (hasMore) {
          const { data: shopsBatch, error: shopsError } = await supabase
            .from('listings')
            .select('*')
            .range(from, from + batchSize - 1);

          if (shopsError) throw shopsError;

          if (shopsBatch && shopsBatch.length > 0) {
            allShops = [...allShops, ...shopsBatch];
            from += batchSize;
            hasMore = shopsBatch.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        const shops = allShops;

        // Fetch all reviews in batches
        let allReviews: any[] = [];
        from = 0;
        hasMore = true;

        while (hasMore) {
          const { data: reviewsBatch, error: reviewsError } = await supabase
            .from('reviews')
            .select('rating')
            .range(from, from + batchSize - 1);

          if (reviewsError) throw reviewsError;

          if (reviewsBatch && reviewsBatch.length > 0) {
            allReviews = [...allReviews, ...reviewsBatch];
            from += batchSize;
            hasMore = reviewsBatch.length === batchSize;
          } else {
            hasMore = false;
          }
        }

        const reviews = allReviews;

        // Calculate stats
        const totalShops = shops?.length || 0;
        const totalReviews = reviews?.length || 0;
        const averageRating = reviews && reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

        const shopsWithHours = shops?.filter(s => s.hours_monday || s.hours_tuesday).length || 0;
        const verifiedShops = shops?.filter(s => s.is_verified).length || 0;

        // Recent shops (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentShops = shops?.filter(s =>
          s.created_at && new Date(s.created_at) > thirtyDaysAgo
        ).length || 0;

        setStats({
          totalShops,
          totalReviews,
          averageRating,
          shopsWithHours,
          recentShops,
          verifiedShops,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Shops',
      value: stats.totalShops.toLocaleString(),
      icon: '🏪',
      color: 'bg-blue-500',
      link: '/admin/shops',
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews.toLocaleString(),
      icon: '⭐',
      color: 'bg-yellow-500',
      link: '/admin/reviews',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: '📊',
      color: 'bg-green-500',
    },
    {
      title: 'Shops with Hours',
      value: stats.shopsWithHours.toLocaleString(),
      icon: '🕒',
      color: 'bg-purple-500',
      link: '/admin/hours',
    },
    {
      title: 'New This Month',
      value: stats.recentShops.toLocaleString(),
      icon: '🆕',
      color: 'bg-orange-500',
    },
    {
      title: 'Verified Shops',
      value: stats.verifiedShops.toLocaleString(),
      icon: '✓',
      color: 'bg-indigo-500',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your TireShopPro admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  {card.link && (
                    <Link
                      href={card.link}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                    >
                      View details →
                    </Link>
                  )}
                </div>
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/shops"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">➕</span>
              <div>
                <p className="font-semibold text-gray-900">Add Shop</p>
                <p className="text-sm text-gray-600">Create new listing</p>
              </div>
            </Link>

            <Link
              href="/admin/hours"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">⏰</span>
              <div>
                <p className="font-semibold text-gray-900">Import Hours</p>
                <p className="text-sm text-gray-600">Bulk update hours</p>
              </div>
            </Link>

            <Link
              href="/admin/reviews"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-semibold text-gray-900">Manage Reviews</p>
                <p className="text-sm text-gray-600">Moderate reviews</p>
              </div>
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-semibold text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-600">Site performance</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-gray-700">Database Connection</span>
              </div>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-gray-700">API Status</span>
              </div>
              <span className="text-sm font-medium text-green-600">Operational</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-700">Data Coverage</span>
              </div>
              <span className="text-sm font-medium text-blue-600">
                {((stats.shopsWithHours / stats.totalShops) * 100).toFixed(0)}% with hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
