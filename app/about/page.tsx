import Header from '@/components/Header';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About TireShopPro
          </h1>
          <p className="text-xl">
            Canada's most comprehensive directory of tire shops and services
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              We're dedicated to connecting Canadians with quality tire shops and services across the country.
              Whether you need tire installation, alignment, repair, or seasonal tire changes, we make it easy
              to find trusted professionals in your area.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">🔍 Comprehensive Search</h3>
                <p className="text-gray-700">
                  Search by location, services, hours, and more to find the perfect tire shop for your needs
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">⭐ Reviews & Ratings</h3>
                <p className="text-gray-700">
                  Read genuine reviews from real customers to make informed decisions
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">⏰ Up-to-Date Information</h3>
                <p className="text-gray-700">
                  Access current hours, contact details, and service offerings
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">📍 Nationwide Coverage</h3>
                <p className="text-gray-700">
                  Find tire shops across all Canadian provinces and territories
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions or want to list your tire shop? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
