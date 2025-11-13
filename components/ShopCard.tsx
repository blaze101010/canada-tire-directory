import Link from 'next/link';
import { TireShop } from '@/types';
import { formatDistance } from '@/lib/utils';
import RatingStars from './RatingStars';
import { memo } from 'react';

interface ShopCardProps {
  shop: TireShop & { distance?: number };
}

function getTodayHours(shop: TireShop): string | null {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  const hoursKey = `hours_${today}` as keyof TireShop;
  const hours = shop[hoursKey];

  if (typeof hours === 'string' && hours !== 'N/A') {
    return hours;
  }
  return null;
}

function ShopCard({ shop }: ShopCardProps) {
  const todayHours = getTodayHours(shop);
  return (
    <Link href={`/shop/${shop.slug || shop.id}`} className="block group">
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-500 animate-fade-in cursor-pointer relative overflow-hidden">
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-1">
          <span className="text-2xl mr-3">🛞</span>
          <h3 className="text-xl font-bold text-blue-900">{shop.name}</h3>
        </div>
        {shop.distance !== undefined && (
          <div className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold whitespace-nowrap">
            📍 {formatDistance(shop.distance)}
          </div>
        )}
      </div>

      {/* Open Now Badge & Today's Hours */}
      {(shop.is_open_now !== null || todayHours) && (
        <div className="flex items-center gap-2 mb-4">
          {shop.is_open_now !== null && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              shop.is_open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                shop.is_open_now ? 'bg-green-600' : 'bg-red-600'
              }`}></span>
              {shop.is_open_now ? 'Open Now' : 'Closed'}
            </span>
          )}
          {todayHours && (
            <span className="text-xs text-gray-600">
              <span className="font-semibold">Today:</span> {todayHours}
            </span>
          )}
        </div>
      )}

      {/* Rating Display */}
      {shop.average_rating !== null && shop.average_rating !== undefined && shop.average_rating > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-200">
          <RatingStars
            rating={shop.average_rating}
            reviewCount={shop.reviews_count || undefined}
            size="sm"
          />
        </div>
      )}

      <div className="space-y-3">
        {shop.street && (
          <div className="flex items-start">
            <span className="font-semibold text-gray-600 min-w-[100px]">Address:</span>
            <span className="text-gray-800">{shop.street}</span>
          </div>
        )}

        <div className="flex items-start">
          <span className="font-semibold text-gray-600 min-w-[100px]">City:</span>
          <span className="text-gray-800">{shop.city}</span>
        </div>

        {shop.postal_code && (
          <div className="flex items-start">
            <span className="font-semibold text-gray-600 min-w-[100px]">Postal Code:</span>
            <span className="text-gray-800">{shop.postal_code}</span>
          </div>
        )}

        {shop.phone && (
          <div className="flex items-start">
            <span className="font-semibold text-gray-600 min-w-[100px]">Phone:</span>
            <span
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `tel:${shop.phone}`;
              }}
            >
              {shop.phone}
            </span>
          </div>
        )}

        {((shop as any).working_hours || (shop as any).business_status) && (
          <div className="flex items-start">
            <span className="font-semibold text-gray-600 min-w-[100px]">Hours:</span>
            <span className="text-gray-800">{(shop as any).working_hours || 'Check website'}</span>
          </div>
        )}

        {((shop.reviews_count !== null && shop.reviews_count !== undefined && shop.reviews_count > 0) || (shop as any).reviews > 0) && (
          <div className="flex items-start">
            <span className="font-semibold text-gray-600 min-w-[100px]">Reviews:</span>
            <span className="text-gray-800">{(shop as any).reviews || shop.reviews_count || 0} reviews</span>
          </div>
        )}
      </div>

      {/* Services Checkmark Matrix */}
      {(shop as any).services && (shop as any).services.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Services Available:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {['Tire Sales', 'Tire Installation', 'Wheel Alignment', 'Brake Service', 'Oil Change', 'Tire Repair'].map((service) => {
              const hasService = (shop as any).services?.some((s: string) =>
                s.toLowerCase().includes(service.toLowerCase()) ||
                service.toLowerCase().includes(s.toLowerCase())
              );
              return (
                <div key={service} className="flex items-center gap-2">
                  {hasService ? (
                    <span className="text-green-600 font-bold">✓</span>
                  ) : (
                    <span className="text-gray-300">✗</span>
                  )}
                  <span className={hasService ? 'text-gray-700' : 'text-gray-400'}>
                    {service}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-block bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
          {shop.state || shop.province_code}
        </span>
        <span className="text-sm text-indigo-600 font-medium">
          View Details →
        </span>
      </div>
      </div>
    </div>
    </Link>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(ShopCard);
