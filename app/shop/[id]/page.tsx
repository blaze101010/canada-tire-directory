'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import RatingStars from '@/components/RatingStars';
import ShopCard from '@/components/ShopCard';
import Breadcrumb from '@/components/Breadcrumb';
import WorkingHours from '@/components/WorkingHours';
import SchemaMarkup from '@/components/SchemaMarkup';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';

// Dynamic imports for heavy components (better performance)
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

const ReviewsList = dynamic(() => import('@/components/ReviewsList'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
      <p className="text-gray-600">Loading reviews...</p>
    </div>
  ),
});

const ReviewForm = dynamic(() => import('@/components/ReviewForm'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
      <p className="text-gray-600">Loading review form...</p>
    </div>
  ),
});

export default function ShopDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.id as string;

  const [shop, setShop] = useState<TireShop | null>(null);
  const [relatedShops, setRelatedShops] = useState<TireShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShop() {
      try {
        setLoading(true);
        setError(null);

        // Fetch shop details by slug first, fallback to id for backward compatibility
        let { data: shopData, error: shopError } = await supabase
          .from('listings')
          .select('*')
          .eq('slug', shopId)
          .single();

        // If not found by slug, try by ID (backward compatibility)
        if (shopError || !shopData) {
          const { data: shopDataById, error: shopErrorById } = await supabase
            .from('listings')
            .select('*')
            .eq('id', shopId)
            .single();

          shopData = shopDataById;
          shopError = shopErrorById;
        }

        if (shopError) throw shopError;
        if (!shopData) throw new Error('Shop not found');

        const typedShopData = shopData as TireShop;
        setShop(typedShopData);

        // Fetch related shops in the same city
        let relatedQuery = supabase
          .from('listings')
          .select('*')
          .eq('city', typedShopData.city)
          .neq('id', shopId)
          .limit(3);

        if (typedShopData.state) {
          relatedQuery = relatedQuery.eq('state', typedShopData.state);
        }

        const { data: relatedData } = await relatedQuery;

        setRelatedShops((relatedData || []) as TireShop[]);
      } catch (err) {
        console.error('Error fetching shop:', err);
        setError('Shop not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    }

    if (shopId) {
      fetchShop();
    }
  }, [shopId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading shop details...</p>
        </div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The shop you\'re looking for doesn\'t exist.'}</p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const provinceSlug = shop.state?.toLowerCase().replace(/\s+/g, '-');
  const citySlug = shop.city.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema Markup for SEO */}
      <SchemaMarkup type="localbusiness" data={{ shop }} />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: shop.state || 'Province', href: `/tire-shops/${provinceSlug}` },
          { label: shop.city, href: `/tire-shops/${provinceSlug}/${citySlug}` },
          { label: shop.name }
        ]}
      />

      {/* Hero Section with Shop Info */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Shop Details */}
            <div className="lg:col-span-2">
              {/* Shop Name & Status */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3 gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex-1">{shop.name}</h1>
                  <div className="flex items-center gap-2">
                    {shop.is_verified && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <ShareButtons
                      url={typeof window !== 'undefined' ? window.location.href : `https://tireshoppro.ca/shop/${shop.slug || shop.id}`}
                      title={`${shop.name} - Tire Shop`}
                      description={`Check out ${shop.name} in ${shop.city}, ${shop.state}. ${shop.description || 'Find tire services, contact information, and hours of operation.'}`}
                    />
                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium no-print"
                      aria-label="Print this page"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span className="hidden sm:inline">Print</span>
                    </button>
                  </div>
                </div>

                {/* Rating */}
                {shop.average_rating && shop.average_rating > 0 && (
                  <div className="mb-4">
                    <RatingStars
                      rating={shop.average_rating}
                      reviewCount={shop.reviews_count ?? undefined}
                      size="lg"
                    />
                  </div>
                )}

                {/* Business Status */}
                {shop.business_status && (
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    shop.business_status === 'OPERATIONAL'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {shop.business_status === 'OPERATIONAL' ? '🟢 Open' : 'Status: ' + shop.business_status}
                  </span>
                )}
              </div>

              {/* Description */}
              {shop.description && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">{shop.description}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  {/* Address */}
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-700">{shop.full_address || `${shop.street}, ${shop.city}, ${shop.state} ${shop.postal_code}`}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  {shop.phone && (
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">📞</span>
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <a href={`tel:${shop.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {shop.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {shop.site && (
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🌐</span>
                      <div>
                        <p className="font-semibold text-gray-900">Website</p>
                        <a
                          href={shop.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium break-all"
                        >
                          {shop.site}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Working Hours */}
              <div className="mb-6">
                <WorkingHours shop={shop} />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {shop.phone && (
                  <a
                    href={`tel:${shop.phone}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">📞</span> Call Now
                  </a>
                )}
                {shop.latitude && shop.longitude && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">🗺️</span> Get Directions
                  </a>
                )}
                {shop.site && (
                  <a
                    href={shop.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">🌐</span> Visit Website
                  </a>
                )}
                {shop.booking_appointment_link && (
                  <a
                    href={shop.booking_appointment_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-orange-700 transition-colors flex items-center justify-center"
                  >
                    <span className="mr-2">📅</span> Book Appointment
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Photo */}
            {shop.photo_url && (
              <div className="lg:col-span-1">
                <img
                  src={shop.photo_url}
                  alt={shop.name}
                  className="w-full h-64 lg:h-full object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      {shop.latitude && shop.longitude && (
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Map shops={[shop]} center={[shop.latitude, shop.longitude]} zoom={15} />
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reviews List */}
            <div>
              <ReviewsList shopId={shop.id} />
            </div>

            {/* Review Form */}
            <div>
              <ReviewForm shopId={shop.id} shopName={shop.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Shops */}
      {relatedShops.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More Tire Shops in {shop.city}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedShops.map((relatedShop) => (
                <ShopCard key={relatedShop.id} shop={relatedShop} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href={`/tire-shops/${provinceSlug}/${citySlug}`}
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View All Shops in {shop.city}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Back to Search */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back to Search
          </Link>
        </div>
      </section>
    </div>
  );
}
