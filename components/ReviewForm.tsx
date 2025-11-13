'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReviewFormProps {
  shopId: string;
  shopName: string;
  onSuccess?: () => void;
}

interface ReviewFormData {
  rating: number;
  reviewer_name: string;
  reviewer_email: string;
  title: string;
  comment: string;
  service_type: string;
  visit_date: string;
  would_recommend: boolean;
}

export default function ReviewForm({ shopId, shopName, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    reviewer_name: '',
    reviewer_email: '',
    title: '',
    comment: '',
    service_type: '',
    visit_date: '',
    would_recommend: true,
  });

  const [errors, setErrors] = useState<Partial<ReviewFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hoveredRating, setHoveredRating] = useState(0);

  const serviceTypes = [
    'Tire Installation',
    'Wheel Alignment',
    'Tire Repair',
    'Winter Tires',
    'Tire Rotation',
    'Tire Balancing',
    'Oil Change',
    'Brake Service',
    'Inspection',
    'Tire Storage',
    'Other'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ReviewFormData> = {};

    if (formData.rating === 0) {
      newErrors.rating = 0; // Use 0 to indicate error
    }

    if (!formData.reviewer_name.trim()) {
      newErrors.reviewer_name = 'Name is required';
    }

    if (!formData.reviewer_email.trim()) {
      newErrors.reviewer_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reviewer_email)) {
      newErrors.reviewer_email = 'Please enter a valid email address';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (formData.comment.trim().length < 20) {
      newErrors.comment = 'Review must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field
    if (errors[name as keyof ReviewFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
    if (errors.rating !== undefined) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { data, error } = await supabase.from('reviews').insert([
        {
          listing_id: shopId,
          rating: formData.rating,
          reviewer_name: formData.reviewer_name,
          reviewer_email: formData.reviewer_email,
          title: formData.title || null,
          comment: formData.comment,
          service_type: formData.service_type || null,
          visit_date: formData.visit_date || null,
          would_recommend: formData.would_recommend,
          is_approved: false, // Needs approval
        },
      ]);

      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('Review submitted successfully:', data);
      setSubmitStatus('success');
      setFormData({
        rating: 0,
        reviewer_name: '',
        reviewer_email: '',
        title: '',
        comment: '',
        service_type: '',
        visit_date: '',
        would_recommend: true,
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(), 2000);
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      console.error('Error message:', error?.message);
      console.error('Error details:', error?.details);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h2>
      <p className="text-gray-600 mb-6">Share your experience with {shopName}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Rating *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-4xl focus:outline-none transition-transform hover:scale-110"
              >
                {(hoveredRating || formData.rating) >= star ? (
                  <span className="text-yellow-400">★</span>
                ) : (
                  <span className="text-gray-300">☆</span>
                )}
              </button>
            ))}
            {formData.rating > 0 && (
              <span className="ml-2 text-gray-600">
                {formData.rating === 1 && 'Poor'}
                {formData.rating === 2 && 'Fair'}
                {formData.rating === 3 && 'Good'}
                {formData.rating === 4 && 'Very Good'}
                {formData.rating === 5 && 'Excellent'}
              </span>
            )}
          </div>
          {errors.rating !== undefined && (
            <p className="mt-1 text-sm text-red-600">Please select a rating</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label htmlFor="reviewer_name" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="reviewer_name"
            name="reviewer_name"
            value={formData.reviewer_name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.reviewer_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Smith"
          />
          {errors.reviewer_name && (
            <p className="mt-1 text-sm text-red-600">{errors.reviewer_name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="reviewer_email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address * <span className="text-gray-500 font-normal">(not displayed publicly)</span>
          </label>
          <input
            type="email"
            id="reviewer_email"
            name="reviewer_email"
            value={formData.reviewer_email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              errors.reviewer_email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.reviewer_email && (
            <p className="mt-1 text-sm text-red-600">{errors.reviewer_email}</p>
          )}
        </div>

        {/* Title (Optional) */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Review Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Great service and fair prices"
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 mb-2">
            Service Received (Optional)
          </label>
          <select
            id="service_type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="">Select a service...</option>
            {serviceTypes.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Visit Date */}
        <div>
          <label htmlFor="visit_date" className="block text-sm font-semibold text-gray-700 mb-2">
            Visit Date (Optional)
          </label>
          <input
            type="date"
            id="visit_date"
            name="visit_date"
            value={formData.visit_date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
              errors.comment ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Share your experience with this tire shop... (minimum 20 characters)"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.comment && <p className="text-sm text-red-600">{errors.comment}</p>}
            <p className="text-sm text-gray-500 ml-auto">
              {formData.comment.length} characters
            </p>
          </div>
        </div>

        {/* Would Recommend */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="would_recommend"
            name="would_recommend"
            checked={formData.would_recommend}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="would_recommend" className="ml-3 text-sm font-medium text-gray-700">
            I would recommend this shop to others
          </label>
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">✅</span>
              <div>
                <h4 className="text-green-800 font-semibold mb-1">Thank You for Your Review!</h4>
                <p className="text-green-700 text-sm">
                  Your review has been submitted and is pending approval. It will appear on the shop's page once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">❌</span>
              <div>
                <h4 className="text-red-800 font-semibold mb-1">Error Submitting Review</h4>
                <p className="text-red-700 text-sm">
                  Something went wrong. Please try again or contact support if the problem persists.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            'Submit Review'
          )}
        </button>

        <p className="text-sm text-gray-500 text-center">
          * Required fields | Your review will be visible after moderation
        </p>
      </form>
    </div>
  );
}
