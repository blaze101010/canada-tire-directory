'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Review {
  id: string;
  shop_id: string;
  shop_name: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_approved?: boolean;
}

export default function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;

    if (filter !== 'all') {
      filtered = filtered.filter(r =>
        filter === 'approved' ? r.is_approved : !r.is_approved
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.review_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [filter, searchTerm, reviews]);

  async function fetchReviews() {
    try {
      const { data: reviewsData, error } = await supabase
        .from('reviews')
        .select(`
          *,
          listings!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formatted = reviewsData?.map((r: any) => ({
        id: r.id,
        shop_id: r.shop_id,
        shop_name: r.listings.name,
        user_name: r.user_name,
        rating: r.rating,
        review_text: r.review_text,
        created_at: r.created_at,
        is_approved: r.is_approved ?? true,
      })) || [];

      setReviews(formatted);
      setFilteredReviews(formatted);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleApproval(reviewId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('reviews')
        // @ts-ignore - Supabase type inference issue
        .update({ is_approved: !currentStatus } as any)
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.map(r =>
        r.id === reviewId ? { ...r, is_approved: !currentStatus } : r
      ));
    } catch (err) {
      console.error('Error updating review:', err);
      alert('Failed to update review');
    }
  }

  async function deleteReview(reviewId: string) {
    if (!confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

      if (error) throw error;

      setReviews(reviews.filter(r => r.id !== reviewId));
      alert('Review deleted successfully');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  }

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.is_approved).length,
    pending: reviews.filter(r => !r.is_approved).length,
    averageRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading reviews...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600 mt-1">Moderate and manage user reviews</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Total Reviews</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
            <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reviews..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Reviews</option>
                <option value="approved">Approved Only</option>
                <option value="pending">Pending Only</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Showing {filteredReviews.length} of {reviews.length} reviews
          </div>

          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 border-2 border-gray-200 text-center">
              <p className="text-gray-500">No reviews found</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.user_name}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        review.is_approved
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.is_approved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <Link
                      href={`/shop/${review.shop_id}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {review.shop_name} →
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{review.review_text}</p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleApproval(review.id, review.is_approved || false)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      review.is_approved
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {review.is_approved ? 'Unapprove' : 'Approve'}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
