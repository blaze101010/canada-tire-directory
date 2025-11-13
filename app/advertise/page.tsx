import Header from '@/components/Header';
import Link from 'next/link';

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get Premium Visibility for Your Tire Shop
          </h1>
          <p className="text-xl mb-8">
            Reach thousands of customers looking for tire services in your area
          </p>
          <Link
            href="/contact"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Advertise With Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Targeted Exposure</h3>
              <p className="text-gray-600">
                Reach customers actively searching for tire shops in your area
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Premium Listing</h3>
              <p className="text-gray-600">
                Stand out with featured placement, photos, and detailed information
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Affordable Pricing</h3>
              <p className="text-gray-600">
                Flexible plans that fit your budget and marketing goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to learn more about our advertising packages
          </p>
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
