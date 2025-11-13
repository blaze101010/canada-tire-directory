import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Services in Canada | Installation, Alignment, Repair & More | TireShopPro.ca',
  description: `Find tire services near you from ${siteConfig.totalShops} tire shops across Canada. Tire installation, wheel alignment, tire repair, winter tires, and more.`,
  keywords: 'tire services, tire installation, wheel alignment, tire repair, winter tires, tire rotation, tire balancing',
};

const services = [
  {
    slug: 'tire-installation',
    title: 'Tire Installation',
    icon: '🔧',
    description: 'Professional tire mounting, balancing, and installation services',
    price: '$20-45 per tire',
    features: ['Mounting', 'Balancing', 'Valve stems', 'TPMS service', 'Disposal'],
  },
  {
    slug: 'wheel-alignment',
    title: 'Wheel Alignment',
    icon: '⚖️',
    description: 'Precise wheel alignment to improve handling and tire life',
    price: '$80-150',
    features: ['4-wheel alignment', 'Suspension check', 'Steering adjustment', 'Test drive'],
  },
  {
    slug: 'tire-repair',
    title: 'Tire Repair',
    icon: '🛠️',
    description: 'Fast flat tire repair and puncture patching services',
    price: '$20-35 per tire',
    features: ['Puncture repair', 'Plug & patch', 'Leak detection', 'Pressure check'],
  },
  {
    slug: 'winter-tires',
    title: 'Winter Tires',
    icon: '❄️',
    description: 'Winter tire sales, installation, and seasonal changeover',
    price: 'Varies',
    features: ['Winter tire selection', 'Installation', 'Storage options', 'Changeover service'],
  },
  {
    slug: 'tire-rotation',
    title: 'Tire Rotation',
    icon: '🔄',
    description: 'Regular tire rotation to extend tire life and improve wear',
    price: '$20-50',
    features: ['Pattern rotation', 'Pressure check', 'Visual inspection', 'Torque check'],
  },
  {
    slug: 'tire-balancing',
    title: 'Tire Balancing',
    icon: '⚙️',
    description: 'Professional wheel balancing for smooth, vibration-free driving',
    price: '$15-25 per tire',
    features: ['Dynamic balancing', 'Weight placement', 'Vibration elimination', 'Test drive'],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tire Services Across Canada
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find professional tire services near you from {siteConfig.totalShops} tire shops
            </p>
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
            >
              Find Tire Services Near Me
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Tire Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tire services available at thousands of shops across Canada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className={`bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-smooth transform hover:-translate-y-1 animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="mb-4">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 text-blue-600 font-semibold flex items-center">
                  Learn More <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Professional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Professional Tire Services?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '👨‍🔧', title: 'Expert Technicians', description: 'Certified professionals with years of experience' },
              { icon: '🏆', title: 'Quality Work', description: 'Guaranteed workmanship and customer satisfaction' },
              { icon: '⚡', title: 'Fast Service', description: 'Most services completed in under an hour' },
              { icon: '💰', title: 'Fair Pricing', description: 'Competitive rates with no hidden fees' },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl animate-fade-in stagger-${index + 1}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Tire Service Today?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering same-day service
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
          >
            Find Tire Shops Now
          </Link>
        </div>
      </section>
    </div>
  );
}
