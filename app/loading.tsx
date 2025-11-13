export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Skeleton */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-10 bg-blue-700 rounded w-48 animate-pulse"></div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-12 bg-blue-700 rounded w-3/4 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-blue-700 rounded w-2/3 mx-auto mb-8 animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 h-14 bg-blue-700 rounded-lg animate-pulse"></div>
            <div className="h-14 w-full sm:w-auto bg-blue-500 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-12 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-40 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg p-6 bg-white shadow-sm">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
