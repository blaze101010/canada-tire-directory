export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="h-5 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>
      </div>

      {/* City Header Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-10 bg-blue-700 rounded w-96 mb-4 animate-pulse"></div>
          <div className="h-6 bg-blue-700 rounded w-80 mb-6 animate-pulse"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-blue-700 rounded w-40 animate-pulse"></div>
            <div className="h-12 bg-blue-700 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Shops Listing Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6].map((j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* SEO Content Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
