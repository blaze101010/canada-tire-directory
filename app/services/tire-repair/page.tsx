import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Repair Services Near Me | Fast Flat Tire Repair & Patching | TireShopPro.ca',
  description: `Find fast tire repair services at ${siteConfig.totalShops} tire shops across Canada. Professional puncture repair, plug & patch, and flat tire fixes from $20-35.`,
  keywords: 'tire repair near me, flat tire repair, tire puncture repair, tire patch, tire plug, tire leak repair',
  openGraph: {
    title: 'Fast Tire Repair Services | TireShopPro.ca',
    description: 'Get back on the road fast with professional tire repair services. Puncture repair, patching, and leak detection.',
    url: `${siteConfig.url}/services/tire-repair`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function TireRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🛠️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fast Tire Repair Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Get back on the road quickly with professional tire repair services from tire shops across Canada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Tire Repair Near Me
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

      {/* What's Included Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Professional Tire Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tire repair includes thorough inspection and proper fixing methods to ensure safety and longevity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Puncture Repair',
                description: 'Professional repair of tire punctures from nails, screws, and sharp objects'
              },
              {
                icon: '🔧',
                title: 'Plug & Patch',
                description: 'Industry-standard combination repair method for maximum safety and reliability'
              },
              {
                icon: '💧',
                title: 'Leak Detection',
                description: 'Advanced leak detection to find slow leaks and air loss problems'
              },
              {
                icon: '📊',
                title: 'Pressure Check',
                description: 'Complete tire pressure inspection and adjustment to manufacturer specs'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg text-center animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Repair Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Simple Plug</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$15-25</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Quick fix</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Small punctures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠</span>
                  <span>Temporary solution</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plug & Patch</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$20-35</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Permanent repair</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Industry standard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Safe & reliable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full warranty</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Leak Detection</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$10-20</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Find slow leaks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Valve stem check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Diagnostic report</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Important Notes:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span>Sidewall damage cannot be safely repaired - replacement required</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span>Punctures larger than 1/4 inch typically require tire replacement</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <span>Multiple repairs in the same area may not be safe</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Many shops offer free inspections to determine if repair is possible</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Repair vs Replace Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Can Your Tire Be Repaired?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-400">
              <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">✓</span>
                Repairable
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Puncture in the tread area (center of tire)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Hole size less than 1/4 inch (6mm)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>No previous repairs in the same area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>No internal tire damage visible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Tire has adequate tread depth (4/32" or more)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Puncture is straight (not angled)</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-8 border-2 border-red-400">
              <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">✗</span>
                Must Replace
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Sidewall damage or punctures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Holes larger than 1/4 inch</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Damage to tire shoulder area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Multiple punctures close together</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Tire ran flat causing internal damage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>Tread depth below 4/32 inch</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-blue-800">Safety First:</strong> When in doubt, consult a professional tire technician. They can properly inspect your tire and make safety recommendations based on industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* Why Professional Repair */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Professional Tire Repair?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Safety Guaranteed',
                description: 'Professional repairs follow industry safety standards and include thorough inspection of internal tire damage.'
              },
              {
                icon: '⚡',
                title: 'Fast Service',
                description: 'Most tire repairs completed in 30-45 minutes, getting you back on the road quickly and safely.'
              },
              {
                icon: '💰',
                title: 'Cost Effective',
                description: 'Repair costs $20-35 compared to $150-300+ for tire replacement. Save money when repair is possible.'
              },
              {
                icon: '🛠️',
                title: 'Proper Equipment',
                description: 'Professional shops have specialized tools for safe tire removal, inspection, and permanent repair.'
              },
              {
                icon: '✅',
                title: 'Warranty Protection',
                description: 'Most repairs include warranties, and professional work won\'t void your tire manufacturer warranty.'
              },
              {
                icon: '👨‍🔧',
                title: 'Expert Inspection',
                description: 'Certified technicians check for hidden damage that DIY repairs might miss, ensuring safety.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gray-50 rounded-xl p-6 shadow-lg animate-fade-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Repair FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does tire repair take?',
                answer: 'A professional tire repair typically takes 30-45 minutes. This includes removing the tire from the wheel, inspecting for internal damage, applying the plug and patch from inside, and remounting/balancing the tire. Simple plug-only repairs may be faster but aren\'t as safe or permanent.'
              },
              {
                question: 'Is tire repair permanent?',
                answer: 'A proper plug and patch repair (also called a combination repair) is considered permanent and safe for the life of the tire. However, a simple plug from the outside is only a temporary fix. Always choose the combination repair method for maximum safety and longevity.'
              },
              {
                question: 'Can I repair my tire myself?',
                answer: 'While DIY tire repair kits exist, they only plug from the outside and are temporary fixes. Professional repair includes removing the tire, inspecting for internal damage, and applying both a plug and patch from inside. For safety, professional repair is strongly recommended.'
              },
              {
                question: 'How much does tire repair cost?',
                answer: 'Professional tire repair costs between $20-35 per tire for a proper plug and patch combination. This is significantly cheaper than replacing a tire ($150-300+). Many shops offer free inspections to determine if your tire can be safely repaired.'
              },
              {
                question: 'Can run-flat tires be repaired?',
                answer: 'Most tire manufacturers do not recommend repairing run-flat tires, especially if they\'ve been driven while flat. The internal structure may be damaged even if the outside looks fine. Check your vehicle and tire manufacturer guidelines.'
              },
              {
                question: 'How many times can a tire be repaired?',
                answer: 'Industry standards allow up to 2-3 repairs per tire, provided they\'re in different areas and at least 16 inches apart. However, if repairs overlap or are in the same general area, the tire should be replaced for safety reasons.'
              },
              {
                question: 'Will tire repair affect my warranty?',
                answer: 'A proper professional repair following industry standards will not void your tire warranty. However, improper repairs or DIY fixes may void warranties. Always keep receipts and documentation of professional repairs.'
              },
              {
                question: 'What if the nail is still in my tire?',
                answer: 'If you can safely drive, leave the nail in place until you reach a tire shop - it may be slowing the air leak. If the tire is rapidly losing air, install your spare and get to a shop immediately. Never attempt to drive on a completely flat tire.'
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

      {/* Emergency Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What To Do When You Get a Flat Tire
          </h2>

          <div className="space-y-4">
            {[
              { step: '1', text: 'Safely pull over to a safe location away from traffic' },
              { step: '2', text: 'Turn on hazard lights and set parking brake' },
              { step: '3', text: 'Assess the damage - check if tire is completely flat or slowly leaking' },
              { step: '4', text: 'If slowly leaking and drivable, carefully drive to nearest tire shop' },
              { step: '5', text: 'If flat, change to spare tire or call roadside assistance' },
              { step: '6', text: 'NEVER drive on a completely flat tire - it causes internal damage' },
              { step: '7', text: 'Get professional inspection within 24 hours, even if using spare' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  {item.step}
                </div>
                <p className="text-gray-800 pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Tire Repair Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering fast, professional tire repair
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Tire Repair Now
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
