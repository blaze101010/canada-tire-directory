'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';

interface ShopFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  website: string;
  description: string;
  services: string[];
  owner_name: string;
  additional_info: string;
}

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
  'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon'
];

const SERVICES = [
  'Tire Sales',
  'Tire Installation',
  'Wheel Alignment',
  'Tire Repair',
  'Winter Tires',
  'Tire Rotation',
  'Tire Balancing',
  'Oil Change',
  'Brake Service',
  'Vehicle Inspection',
  'Tire Storage'
];

export default function AddShopPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<ShopFormData>({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postal_code: '',
    website: '',
    description: '',
    services: [],
    owner_name: '',
    additional_info: ''
  });

  const [errors, setErrors] = useState<Partial<ShopFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-fill email if user is authenticated
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ShopFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Shop name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.province) newErrors.province = 'Province is required';
    if (!formData.postal_code.trim()) newErrors.postal_code = 'Postal code is required';
    if (!formData.owner_name.trim()) newErrors.owner_name = 'Contact name is required';
    if (formData.services.length === 0) newErrors.services = ['Please select at least one service'];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShopFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
    if (errors.services) {
      setErrors(prev => ({ ...prev, services: undefined }));
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
      // Call the API endpoint with user ID
      const response = await fetch('/api/add-shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_id: user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit shop');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        province: '',
        postal_code: '',
        website: '',
        description: '',
        services: [],
        owner_name: '',
        additional_info: ''
      });

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <span className="text-6xl mb-4 block">🔒</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be signed in to add your tire shop to our directory.
              Create a free account or sign in to get started.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="/login"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Add Your Tire Shop
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join 6,700+ tire shops across Canada. Get discovered by customers looking for tire services in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-xl p-6 animate-fade-in">
              <div className="flex items-start">
                <span className="text-4xl mr-4">✅</span>
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Submission Received!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Thank you for submitting your tire shop! We'll review your information and add your shop to our directory within 2-3 business days.
                  </p>
                  <p className="text-green-700 text-sm">
                    You'll receive a confirmation email at <strong>{formData.email}</strong> once your shop is live.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-8 bg-red-50 border-2 border-red-500 rounded-xl p-6">
              <div className="flex items-start">
                <span className="text-4xl mr-4">❌</span>
                <div>
                  <h3 className="text-2xl font-bold text-red-800 mb-2">
                    Submission Failed
                  </h3>
                  <p className="text-red-700">
                    Something went wrong. Please try again or contact us directly at info@tireshoppro.ca
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <span className="text-4xl mb-3 block">🎯</span>
              <h3 className="font-bold text-gray-900 mb-2">Get Discovered</h3>
              <p className="text-gray-600 text-sm">Reach customers actively searching for tire services</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <span className="text-4xl mb-3 block">💰</span>
              <h3 className="font-bold text-gray-900 mb-2">Free Listing</h3>
              <p className="text-gray-600 text-sm">No fees or commissions. 100% free directory listing</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <span className="text-4xl mb-3 block">⚡</span>
              <h3 className="font-bold text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600 text-sm">Live within 2-3 business days after approval</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shop Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Shop Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ABC Tire & Auto"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Contact Information Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="contact@yourshop.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>

                {/* Street Address */}
                <div className="mb-6">
                  <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.street ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Toronto"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  {/* Province */}
                  <div>
                    <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-2">
                      Province *
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.province ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select...</option>
                      {PROVINCES.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label htmlFor="postal_code" className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.postal_code ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="M5H 2N2"
                    />
                    {errors.postal_code && <p className="mt-1 text-sm text-red-600">{errors.postal_code}</p>}
                  </div>
                </div>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-semibold text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="https://www.yourshop.com"
                />
              </div>

              {/* Services Offered */}
              <div className="pt-6 border-t border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Services Offered *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES.map(service => (
                    <label
                      key={service}
                      className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.services.includes(service)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.services && <p className="mt-2 text-sm text-red-600">{errors.services[0]}</p>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Shop Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Brief description of your shop, specialties, years in business, etc."
                />
              </div>

              {/* Owner Name */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Person</h3>
                <div>
                  <label htmlFor="owner_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="owner_name"
                    name="owner_name"
                    value={formData.owner_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.owner_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Smith"
                  />
                  {errors.owner_name && <p className="mt-1 text-sm text-red-600">{errors.owner_name}</p>}
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <label htmlFor="additional_info" className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Any other information you'd like us to know..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
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
                    'Submit Your Shop'
                  )}
                </button>
                <p className="text-sm text-gray-500 text-center mt-3">
                  * Required fields | Free listing | No credit card required
                </p>
              </div>
            </form>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
