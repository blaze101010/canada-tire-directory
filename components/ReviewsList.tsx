'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Review } from '@/types';
import RatingStars from './RatingStars';

interface ReviewsListProps {
  shopId: string;
}

export default function ReviewsList({ shopId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('reviews')
          .select('*')
          .eq('listing_id', shopId)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        setReviews(data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [shopId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
        <div className="text-center py-12 bg-yellow-50 rounded-lg border-2 border-yellow-200">
          <span className="text-6xl mb-4 block">⚠️</span>
          <p className="text-gray-900 text-lg mb-2 font-semibold">Reviews Feature Setup Required</p>
          <p className="text-gray-600 text-sm mb-4">
            The reviews table needs to be created in your database.
          </p>
          <p className="text-gray-500 text-xs">
            Run: <code className="bg-gray-100 px-2 py-1 rounded">npx tsx scripts/run-reviews-migration.ts</code>
          </p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <span className="text-6xl mb-4 block">📝</span>
          <p className="text-gray-600 text-lg mb-2">No reviews yet</p>
          <p className="text-gray-500">Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const recommendCount = reviews.filter(r => r.would_recommend).length;
  const recommendPercent = Math.round((recommendCount / reviews.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      {/* Summary Section */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <span className="text-5xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <RatingStars rating={averageRating} size="lg" />
                <p className="text-sm text-gray-600 mt-1">
                  Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
            {recommendPercent > 0 && (
              <div className="inline-flex items-center bg-green-50 px-4 py-2 rounded-lg">
                <span className="text-2xl mr-2">👍</span>
                <span className="text-sm font-semibold text-green-800">
                  {recommendPercent}% would recommend
                </span>
              </div>
            )}
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating - 1];
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-12">
                    {rating} star{rating !== 1 && 's'}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <RatingStars rating={review.rating} size="sm" />
                  {review.is_verified && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                      ✓ Verified
                    </span>
                  )}
                </div>
                {review.title && (
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{review.title}</h3>
                )}
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {formatDate(review.created_at)}
              </span>
            </div>

            {/* Review Content */}
            <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

            {/* Review Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-semibold mr-1">By:</span>
                {review.reviewer_name}
              </div>
              {review.service_type && (
                <div className="flex items-center">
                  <span className="mr-1">•</span>
                  <span className="font-semibold mr-1">Service:</span>
                  {review.service_type}
                </div>
              )}
              {review.visit_date && (
                <div className="flex items-center">
                  <span className="mr-1">•</span>
                  <span className="font-semibold mr-1">Visited:</span>
                  {formatDate(review.visit_date)}
                </div>
              )}
              {review.would_recommend && (
                <div className="flex items-center text-green-600">
                  <span className="mr-1">•</span>
                  <span className="mr-1">👍</span>
                  <span className="font-semibold">Recommends</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Helpful note */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          Reviews are verified and moderated to ensure authenticity
        </p>
      </div>
    </div>
  );
}
