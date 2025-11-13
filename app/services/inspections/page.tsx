import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Vehicle Inspection Services Near Me | Safety Inspection | TireShopPro.ca',
  description: `Find vehicle inspection services at ${siteConfig.totalShops} tire shops across Canada. Pre-purchase inspections, safety checks, and comprehensive vehicle diagnostics from $50-150.`,
  keywords: 'vehicle inspection near me, safety inspection, pre-purchase inspection, car inspection, vehicle check',
  openGraph: {
    title: 'Professional Vehicle Inspection Services | TireShopPro.ca',
    description: 'Comprehensive vehicle inspections, safety checks, and pre-purchase inspections near you.',
    url: `${siteConfig.url}/services/inspections`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function InspectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">📋</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Vehicle Inspection Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive vehicle inspections for safety, pre-purchase, and peace of mind
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Inspection Services Near Me
              </Link>
              <Link
                href="/services"
                className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Inspections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Vehicle Inspections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional inspection services for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '✅',
                title: 'Safety Inspection',
                description: 'Mandatory provincial safety inspection for vehicle registration and transfers',
                price: '$50-100'
              },
              {
                icon: '🔍',
                title: 'Pre-Purchase Inspection',
                description: 'Comprehensive check before buying a used vehicle to identify issues',
                price: '$100-200'
              },
              {
                icon: '🔧',
                title: 'Multi-Point Inspection',
                description: 'Complete vehicle health check with oil changes or regular maintenance',
                price: 'Often Free'
              },
              {
                icon: '🚗',
                title: 'Out-of-Province Inspection',
                description: 'Required inspection when registering a vehicle from another province',
                price: '$80-150'
              },
              {
                icon: '🔌',
                title: 'Diagnostic Inspection',
                description: 'Computer diagnostics to identify check engine lights and fault codes',
                price: '$80-150'
              },
              {
                icon: '📋',
                title: 'Annual Inspection',
                description: 'Routine yearly check-up to catch problems early and maintain vehicle',
                price: '$60-120'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inspected */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What's Included in a Comprehensive Inspection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: 'Brakes', items: ['Brake pads & rotors', 'Brake fluid level', 'Parking brake', 'Brake lines & hoses'] },
              { category: 'Tires & Wheels', items: ['Tire tread depth', 'Tire pressure', 'Wheel condition', 'Wheel bearings'] },
              { category: 'Steering & Suspension', items: ['Shocks & struts', 'Ball joints', 'Tie rod ends', 'Control arms'] },
              { category: 'Lights & Electrical', items: ['All lights working', 'Battery condition', 'Alternator output', 'Wiring condition'] },
              { category: 'Engine & Drivetrain', items: ['Oil & fluid levels', 'Belts & hoses', 'Engine mounts', 'Transmission condition'] },
              { category: 'Body & Safety', items: ['Windshield condition', 'Wipers & washer', 'Mirrors', 'Seatbelts & airbags'] }
            ].map((section, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-4">{section.category}</h3>
                <ul className="space-y-2 text-gray-700">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Purchase Inspection Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Get a Pre-Purchase Inspection?
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: '💰',
                title: 'Save Thousands on Repairs',
                description: 'Discover hidden problems before buying. A $150 inspection can save you $5,000+ in unexpected repairs.'
              },
              {
                icon: '🔍',
                title: 'Unbiased Professional Opinion',
                description: 'Independent mechanic provides honest assessment, not swayed by seller claims or emotions.'
              },
              {
                icon: '📊',
                title: 'Negotiate Better Price',
                description: 'Use inspection findings to negotiate lower price or request seller repairs before purchase.'
              },
              {
                icon: '✅',
                title: 'Peace of Mind',
                description: 'Buy with confidence knowing the vehicle\'s true condition and what maintenance is needed.'
              },
              {
                icon: '🚫',
                title: 'Walk Away from Lemons',
                description: 'Identify flood damage, accidents, frame damage, or major mechanical issues before it\'s too late.'
              },
              {
                icon: '📋',
                title: 'Budget for Future Repairs',
                description: 'Know what repairs or maintenance will be needed soon so you can budget accordingly.'
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md flex items-start"
              >
                <div className="text-5xl mr-6">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-blue-800">Expert Tip:</strong> Never skip a pre-purchase inspection when buying a used car. It's the best $150 you'll spend and can prevent costly mistakes. Even if the seller objects, insist on it - any reliable seller will agree.
            </p>
          </div>
        </div>
      </section>

      {/* Provincial Safety Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Provincial Safety Inspection Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                province: 'Ontario',
                requirement: 'Safety Standards Certificate (SSC) required for private sales and out-of-province vehicles',
                validity: 'Valid for 36 days',
                cost: '$80-120'
              },
              {
                province: 'Quebec',
                requirement: 'Mechanical Inspection Report required for vehicles over 4 years old when changing ownership',
                validity: 'Valid for 30 days',
                cost: '$50-100'
              },
              {
                province: 'British Columbia',
                requirement: 'No mandatory inspection for private sales (dealerships must certify)',
                validity: 'N/A',
                cost: 'N/A'
              },
              {
                province: 'Alberta',
                requirement: 'Out-of-province inspections required for vehicles registered from other provinces',
                validity: 'N/A',
                cost: '$80-150'
              },
              {
                province: 'Manitoba',
                requirement: 'Safety inspection required for vehicles over 5 years old when changing ownership',
                validity: 'Valid for 30 days',
                cost: '$60-100'
              },
              {
                province: 'Saskatchewan',
                requirement: 'Safety inspection required for out-of-province vehicles and when requesting plates',
                validity: 'Valid for 60 days',
                cost: '$70-120'
              }
            ].map((region, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-2xl font-bold text-blue-600 mb-3">{region.province}</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Requirement:</strong> {region.requirement}</p>
                  <p><strong>Validity:</strong> {region.validity}</p>
                  <p><strong>Cost:</strong> {region.cost}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Requirements vary by province. Check with your local registry or tire shop for specific requirements.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Vehicle Inspection FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does a vehicle inspection take?',
                answer: 'A basic safety inspection takes 30-60 minutes. A comprehensive pre-purchase inspection takes 1-2 hours to thoroughly check all systems. Diagnostic inspections (with computer scans) take 1-1.5 hours. Book ahead to avoid wait times.'
              },
              {
                question: 'What if my vehicle fails inspection?',
                answer: 'If a vehicle fails, you\'ll receive a detailed report of issues. You must repair the failed items before re-inspection. Some shops offer discounted or free re-inspection if they do the repairs. You cannot register or sell a vehicle that fails safety inspection in most provinces.'
              },
              {
                question: 'Can I be present during the inspection?',
                answer: 'Most shops allow you to observe or will show you issues afterward. For pre-purchase inspections, being present helps you understand the vehicle\'s condition. Technicians can explain problems and show you worn parts.'
              },
              {
                question: 'How much does a pre-purchase inspection cost?',
                answer: 'Pre-purchase inspections cost $100-200 depending on thoroughness. This includes visual inspection, test drive, computer diagnostics, and detailed written report. Well worth the cost to avoid buying a problem vehicle.'
              },
              {
                question: 'Do I need an inspection for a used car from a dealer?',
                answer: 'Dealers must certify vehicles they sell, but getting an independent inspection is still wise. Dealer inspections may miss issues or be less thorough. Your own inspection protects you and provides leverage for negotiation.'
              },
              {
                question: 'What\'s the difference between safety and mechanical inspection?',
                answer: 'Safety inspections check items affecting safety (brakes, lights, tires, steering) and are required for registration. Mechanical inspections are more comprehensive, checking engine, transmission, suspension, and overall condition - recommended before buying used vehicles.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Vehicle Inspection?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering professional vehicle inspection services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Inspection Services
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
