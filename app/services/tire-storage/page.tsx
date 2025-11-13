import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Storage Services Near Me | Seasonal Tire Storage | TireShopPro.ca',
  description: `Find tire storage services at ${siteConfig.totalShops} tire shops across Canada. Climate-controlled seasonal tire storage for winter and summer tires from $80-150 per season.`,
  keywords: 'tire storage near me, tire storage service, seasonal tire storage, winter tire storage, summer tire storage',
  openGraph: {
    title: 'Professional Tire Storage Services | TireShopPro.ca',
    description: 'Convenient, safe tire storage for your off-season tires. Climate-controlled storage near you.',
    url: `${siteConfig.url}/services/tire-storage`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function TireStoragePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">📦</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tire Storage Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Safe, climate-controlled seasonal tire storage to keep your off-season tires in perfect condition
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Tire Storage Near Me
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
              What's Included in Tire Storage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tire storage services include more than just warehouse space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🌡️',
                title: 'Climate Control',
                description: 'Temperature and humidity-controlled environment prevents rubber deterioration'
              },
              {
                icon: '🧹',
                title: 'Cleaning & Inspection',
                description: 'Tires cleaned and inspected for damage before storage'
              },
              {
                icon: '📋',
                title: 'Inventory Management',
                description: 'Tagged and tracked system ensures your tires are ready when needed'
              },
              {
                icon: '🔄',
                title: 'Changeover Service',
                description: 'Convenient installation when you pick up your stored tires'
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
            Tire Storage Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Storage</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$80-100</div>
              <p className="text-sm text-gray-600 mb-4">per season (6 months)</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Indoor storage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>4 tires (no rims)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Tracking system</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Storage</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$120-150</div>
              <p className="text-sm text-gray-600 mb-4">per season (6 months)</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Climate-controlled</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>4 tires on rims</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Clean & inspect</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Installation included</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Package Deal</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">$250-350</div>
              <p className="text-sm text-gray-600 mb-4">per year (both seasons)</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full year coverage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>2x changeover service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Priority booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Save $50-100</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">What Affects Storage Cost:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Tires on rims vs unmounted tires</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Climate-controlled vs basic indoor</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Location and facility quality</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Bundled with changeover service</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits of Professional Storage */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Benefits of Professional Tire Storage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Save Space at Home',
                description: 'Free up garage, basement, or shed space. No more tripping over tires or cluttering your home.'
              },
              {
                icon: '🛡️',
                title: 'Protect Your Investment',
                description: 'Proper storage prevents dry rot, cracking, and UV damage that shortens tire life. Tires last longer.'
              },
              {
                icon: '🌡️',
                title: 'Optimal Conditions',
                description: 'Climate-controlled environment maintains ideal temperature and humidity for rubber preservation.'
              },
              {
                icon: '🚗',
                title: 'Convenient Service',
                description: 'Drop off tires during changeover, pick up when needed. No hauling tires in your vehicle.'
              },
              {
                icon: '🔒',
                title: 'Secure Storage',
                description: 'Professional facilities with security systems protect your expensive tires from theft or damage.'
              },
              {
                icon: '⏰',
                title: 'Appointment Reminders',
                description: 'Most shops send reminders for seasonal changeover so you never miss the optimal time.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg animate-fade-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Storage Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-400">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">✓</span>
                DO This
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Clean tires before storage (remove dirt, salt, brake dust)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Store in cool, dry, dark location away from sunlight</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Keep tires away from heat sources and electric motors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Use tire bags or plastic wrap to prevent ozone exposure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Store mounted tires vertically (standing up)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Stack unmounted tires horizontally (max 4 high)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Mark tires with position (FL, FR, RL, RR)</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-400">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                <span className="text-3xl mr-3">✗</span>
                DON'T Do This
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Store in direct sunlight or near windows</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Keep in damp basements or areas with moisture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Store near solvents, fuels, or chemicals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Hang tires by hooks or cables (causes distortion)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Store unmounted tires vertically (sidewall damage)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Leave tires on vehicle in storage (flat spots)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  <span>Store with low pressure or deflated</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-blue-800">Pro Tip:</strong> Professional storage facilities handle all these best practices for you. They clean, bag, and store your tires in optimal conditions, eliminating worry and ensuring maximum tire life.
            </p>
          </div>
        </div>
      </section>

      {/* Storage vs Home Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Professional Storage vs At-Home Storage
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Factor</th>
                  <th className="p-4 text-center">Professional Storage</th>
                  <th className="p-4 text-center">At-Home Storage</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { factor: 'Climate Control', pro: '✓ Yes', home: '✗ Usually No' },
                  { factor: 'Space Required', pro: '✓ None', home: '✗ Garage/Shed' },
                  { factor: 'Security', pro: '✓ Professional', home: '~ Basic' },
                  { factor: 'Convenience', pro: '✓ Drop & Forget', home: '✗ Manual Handling' },
                  { factor: 'Tire Life', pro: '✓ Maximized', home: '~ Risk of Damage' },
                  { factor: 'Cleaning & Inspection', pro: '✓ Included', home: '✗ DIY' },
                  { factor: 'Annual Cost', pro: '$100-150', home: '$0' },
                  { factor: 'Installation Service', pro: '✓ Often Included', home: '✗ Not Included' }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-semibold">{row.factor}</td>
                    <td className="p-4 text-center text-green-600">{row.pro}</td>
                    <td className="p-4 text-center text-gray-600">{row.home}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p>Professional storage costs $100-150 per season but saves space, time, and protects your $600-2000+ tire investment.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Storage FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How much does tire storage cost?',
                answer: 'Tire storage typically costs $80-150 per season (6 months) for a set of 4 tires. Climate-controlled storage and tires on rims cost more. Many shops offer annual packages ($250-350) for both winter and summer storage with changeover service, saving $50-100.'
              },
              {
                question: 'How long can tires be stored?',
                answer: 'Properly stored tires can last 6-10 years. Professional storage in climate-controlled, dark conditions maximizes lifespan. Tires stored in poor conditions (heat, sun, moisture) can deteriorate in 3-5 years. Always inspect stored tires before use.'
              },
              {
                question: 'Should I store tires on rims or unmounted?',
                answer: 'Tires on rims are easier to store (stand vertically) and faster to install. Unmounted tires must stack horizontally and require mounting during changeover. Storage on rims costs slightly more but offers convenience. Either method works if done properly.'
              },
              {
                question: 'Do I need to clean tires before storage?',
                answer: 'Yes! Professional shops clean tires before storage. Dirt, salt, and brake dust contain chemicals that damage rubber over time. Clean tires with mild soap and water, let dry completely, then store. This extends tire life significantly.'
              },
              {
                question: 'Can I store tires outside?',
                answer: 'No, never store tires outdoors. UV rays, temperature extremes, and moisture cause rapid deterioration, cracking, and dry rot. Even covered outdoor storage allows UV exposure. Indoor storage is essential - professional climate-controlled storage is ideal.'
              },
              {
                question: 'When should I book tire storage?',
                answer: 'Book storage when scheduling seasonal tire changeover. In Canada, book winter tire installation (October) and summer tire installation (April). Popular shops fill up fast, so book 2-3 weeks ahead. Many offer online booking and automatic seasonal reminders.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-md"
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
            Need Tire Storage?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering professional seasonal tire storage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Tire Storage Services
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
