import { TireShop } from '@/types';

interface WorkingHoursProps {
  shop: TireShop;
}

function getTodayDay(): number {
  return new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
}

export default function WorkingHours({ shop }: WorkingHoursProps) {
  const today = getTodayDay();

  const days = [
    { name: 'Monday', hours: shop.hours_monday, index: 1 },
    { name: 'Tuesday', hours: shop.hours_tuesday, index: 2 },
    { name: 'Wednesday', hours: shop.hours_wednesday, index: 3 },
    { name: 'Thursday', hours: shop.hours_thursday, index: 4 },
    { name: 'Friday', hours: shop.hours_friday, index: 5 },
    { name: 'Saturday', hours: shop.hours_saturday, index: 6 },
    { name: 'Sunday', hours: shop.hours_sunday, index: 0 },
  ];

  // Check if any hours are available
  const hasHours = days.some(day => day.hours && day.hours !== 'N/A');

  if (!hasHours) {
    return null; // Don't render if no hours data
  }

  return (
    <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🕒</span>
        Hours of Operation
      </h2>

      {/* Open Now Badge */}
      {shop.is_open_now !== null && (
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
          shop.is_open_now ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${
            shop.is_open_now ? 'bg-green-600' : 'bg-red-600'
          }`}></span>
          {shop.is_open_now ? 'Open Now' : 'Closed'}
        </div>
      )}

      {/* 24 Hours Badge */}
      {shop.is_24_hours && (
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ml-2 bg-blue-100 text-blue-800">
          <span className="mr-1">⏰</span>
          Open 24 Hours
        </div>
      )}

      {/* Weekly Schedule */}
      <div className="space-y-2">
        {days.map((day) => {
          const isToday = day.index === today;
          const dayHours = day.hours || 'N/A';
          const isClosed = dayHours.toLowerCase() === 'closed';

          return (
            <div
              key={day.name}
              className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                isToday
                  ? 'bg-blue-50 border-2 border-blue-300 font-semibold'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span className="text-gray-900 min-w-[100px]">
                {day.name}
                {isToday && <span className="ml-2 text-xs text-blue-600">(Today)</span>}
              </span>
              <span className={`font-medium ${
                isClosed ? 'text-red-600' :
                isToday ? 'text-blue-900' : 'text-gray-700'
              }`}>
                {dayHours}
              </span>
            </div>
          );
        })}
      </div>

      {/* Last Updated */}
      {shop.hours_last_updated && (
        <p className="text-xs text-gray-500 mt-4 text-center">
          Hours last updated: {new Date(shop.hours_last_updated).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
