import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Tire Installation Services in Canada | Professional Tire Mounting | TireShopPro.ca',
  description: 'Find professional tire installation services near you. Compare prices for tire mounting, balancing, and installation from 6,730+ tire shops across Canada.',
  keywords: 'tire installation, tire mounting, tire fitting, install tires, tire service, professional tire installation',
  openGraph: {
    title: 'Professional Tire Installation Services Across Canada',
    description: 'Find and compare tire installation services from thousands of trusted tire shops.',
    url: `${siteConfig.url}/services/tire-installation`,
  },
};

export default function TireInstallationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Tire Installation' }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🔧</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tire Installation Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find expert tire installation, mounting, and balancing services near you from {siteConfig.totalShops} tire shops across Canada
            </p>
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
            >
              Find Tire Installation Near Me
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 animate-slide-in">
            What's Included in Tire Installation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🛞', title: 'Tire Mounting', description: 'Professional mounting of new tires onto your wheels using specialized equipment.' },
              { icon: '⚖️', title: 'Wheel Balancing', description: 'Precision balancing to ensure smooth ride and prevent vibrations at highway speeds.' },
              { icon: '🔩', title: 'Valve Stem Replacement', description: 'New rubber valve stems installed to prevent air leaks and maintain proper pressure.' },
              { icon: '🔧', title: 'TPMS Service', description: 'Tire Pressure Monitoring System check and reset for vehicles equipped with sensors.' },
              { icon: '♻️', title: 'Old Tire Disposal', description: 'Environmentally responsible disposal of your old tires at no extra charge.' },
              { icon: '✓', title: 'Torque Check', description: 'Proper torque specs applied to lug nuts for safety and wheel integrity.' },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-smooth hover:shadow-xl animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
            Tire Installation Cost in Canada
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Tire installation costs typically range from <strong>$20 to $45 per tire</strong> in Canada, depending on:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Tire size (larger tires cost more to install)</li>
                <li>Your location (urban vs rural areas)</li>
                <li>Type of vehicle (standard, SUV, truck, or performance)</li>
                <li>Additional services (TPMS, nitrogen fill, etc.)</li>
              </ul>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Average Installation Prices:</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between"><span>Standard car tires:</span> <strong>$20-30/tire</strong></div>
                  <div className="flex justify-between"><span>SUV/Truck tires:</span> <strong>$30-40/tire</strong></div>
                  <div className="flex justify-between"><span>Performance/Low-profile:</span> <strong>$35-45/tire</strong></div>
                  <div className="flex justify-between border-t border-gray-300 pt-2 mt-2"><span>Full set (4 tires):</span> <strong>$80-180</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Professional Installation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Professional Tire Installation?
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-700">
                Professional technicians ensure tires are mounted correctly, balanced properly, and torqued to manufacturer specifications,
                critical for safe vehicle operation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Equipment & Expertise</h3>
              <p className="text-gray-700">
                Tire shops have specialized tire changers, balancing machines, and torque wrenches that DIY installation can't match,
                ensuring quality work every time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Time & Convenience</h3>
              <p className="text-gray-700">
                Professional installation typically takes 45-60 minutes for all four tires, saving you hours of work and potential damage
                from improper DIY installation.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Warranty Protection</h3>
              <p className="text-gray-700">
                Many tire manufacturers require professional installation for warranty coverage. Attempting DIY installation could void
                your tire warranty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Installation FAQ
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How long does tire installation take?
              </h3>
              <p className="text-gray-700">
                Professional tire installation typically takes 45-60 minutes for a full set of 4 tires. This includes mounting,
                balancing, and installation on your vehicle. Individual tire installation takes about 15-20 minutes per tire.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do I need to balance tires when installing new ones?
              </h3>
              <p className="text-gray-700">
                Yes, wheel balancing is essential when installing new tires. Even brand new tires can have slight weight variations
                that cause vibrations at high speeds. Professional balancing ensures a smooth, comfortable ride and extends tire life.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Can I install tires myself?
              </h3>
              <p className="text-gray-700">
                While it's technically possible, we strongly recommend professional installation. Tire shops have specialized equipment
                for mounting, balancing, and TPMS service that ensure safety and proper performance. DIY installation also risks damaging
                tires or wheels and may void warranties.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What should I ask when getting tire installation quotes?
              </h3>
              <p className="text-gray-700">
                Ask about: total cost per tire including mounting, balancing, and valve stems; whether TPMS service is included;
                old tire disposal fees; any additional charges; and whether they offer any installation warranties or guarantees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Install Your New Tires?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find trusted tire installation services near you from {siteConfig.totalShops} tire shops across Canada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Search Tire Shops
            </Link>
            <Link
              href="/services"
              className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
