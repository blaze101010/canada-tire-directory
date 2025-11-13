import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Oil Change Services Near Me | Quick Lube & Oil Changes | TireShopPro.ca',
  description: `Find oil change services at ${siteConfig.totalShops} tire shops across Canada. Fast, professional oil changes, synthetic oil, conventional oil, and full-service maintenance from $40-100.`,
  keywords: 'oil change near me, oil change service, synthetic oil change, conventional oil, quick lube, oil change cost',
  openGraph: {
    title: 'Professional Oil Change Services | TireShopPro.ca',
    description: 'Fast, professional oil changes near you. Synthetic and conventional oil, multi-point inspection included.',
    url: `${siteConfig.url}/services/oil-change`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function OilChangePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🛢️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Oil Change Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Fast, reliable oil changes with multi-point inspection at tire shops across Canada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Oil Change Near Me
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
              What's Included in an Oil Change
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional oil change service includes more than just oil replacement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🛢️',
                title: 'Oil Replacement',
                description: 'Fresh oil (synthetic or conventional) meeting manufacturer specifications'
              },
              {
                icon: '🔧',
                title: 'Oil Filter Change',
                description: 'New high-quality oil filter to remove contaminants and protect your engine'
              },
              {
                icon: '✅',
                title: 'Multi-Point Inspection',
                description: 'Check fluids, belts, hoses, battery, lights, and tire pressure'
              },
              {
                icon: '📋',
                title: 'Service Reminder',
                description: 'Oil change sticker with next service date and mileage reminder'
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
            Oil Change Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Conventional Oil</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$40-60</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Up to 5L conventional oil</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Oil filter included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Basic inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>Good for older vehicles</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Synthetic Blend</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$60-80</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Up to 5L synthetic blend</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Premium oil filter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full multi-point inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>Better protection</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Synthetic</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$80-120</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Up to 5L full synthetic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Premium filter</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Complete inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>Best engine protection</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Price Factors:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Oil type (conventional vs synthetic)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Engine oil capacity (some need 6-10L)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Filter quality and brand</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Additional services bundled</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Oil Types Comparison */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Conventional vs Synthetic Oil
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Conventional Oil</h3>
              <div className="space-y-3 text-gray-700 mb-6">
                <p><strong>Best for:</strong> Older vehicles, simple engines, normal driving</p>
                <p><strong>Change interval:</strong> Every 5,000-8,000 km (3,000-5,000 miles)</p>
                <p><strong>Cost:</strong> Most economical option</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Lower cost</li>
                  <li>✓ Adequate for basic needs</li>
                  <li>✓ Widely available</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Cons:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✗ More frequent changes needed</li>
                  <li>✗ Less protection in extreme temps</li>
                  <li>✗ Breaks down faster</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 shadow-lg border-2 border-blue-400">
              <div className="text-center mb-4">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Best Value
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Synthetic Blend</h3>
              <div className="space-y-3 text-gray-700 mb-6">
                <p><strong>Best for:</strong> Most modern vehicles, varied driving conditions</p>
                <p><strong>Change interval:</strong> Every 8,000-10,000 km (5,000-7,000 miles)</p>
                <p><strong>Cost:</strong> Mid-range pricing</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Better protection than conventional</li>
                  <li>✓ Longer lasting</li>
                  <li>✓ Good value for money</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Benefits:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Improved cold-start protection</li>
                  <li>✓ Better high-temp performance</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Full Synthetic</h3>
              <div className="space-y-3 text-gray-700 mb-6">
                <p><strong>Best for:</strong> High-performance, turbocharged, extreme conditions</p>
                <p><strong>Change interval:</strong> Every 12,000-16,000 km (8,000-10,000 miles)</p>
                <p><strong>Cost:</strong> Premium pricing</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Maximum engine protection</li>
                  <li>✓ Longest service intervals</li>
                  <li>✓ Best performance in extremes</li>
                  <li>✓ Cleaner engine operation</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Ideal for:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Luxury vehicles</li>
                  <li>✓ High-mileage vehicles</li>
                  <li>✓ Extreme climates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Regular Oil Changes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Regular Oil Changes Are Important
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔧',
                title: 'Engine Protection',
                description: 'Fresh oil lubricates engine parts, preventing metal-on-metal contact and reducing wear.'
              },
              {
                icon: '🌡️',
                title: 'Heat Control',
                description: 'Oil absorbs and dissipates heat, keeping engine temperatures in safe operating range.'
              },
              {
                icon: '🧹',
                title: 'Cleaner Engine',
                description: 'New oil removes dirt, debris, and combustion byproducts that accumulate over time.'
              },
              {
                icon: '⛽',
                title: 'Better Fuel Economy',
                description: 'Clean oil reduces friction, improving engine efficiency and gas mileage by up to 2%.'
              },
              {
                icon: '🚗',
                title: 'Longer Engine Life',
                description: 'Regular oil changes can extend engine life by 50,000+ km, avoiding costly repairs.'
              },
              {
                icon: '💰',
                title: 'Maintain Warranty',
                description: 'Most warranties require documented oil change maintenance. Keep your receipts!'
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

      {/* When to Change Oil */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            When to Change Your Oil
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Manufacturer Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold text-blue-600 mb-2">Conventional Oil</p>
                  <p className="text-gray-700">Every 5,000-8,000 km or 3-6 months</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-600 mb-2">Synthetic Blend</p>
                  <p className="text-gray-700">Every 8,000-10,000 km or 6 months</p>
                </div>
                <div>
                  <p className="font-semibold text-blue-600 mb-2">Full Synthetic</p>
                  <p className="text-gray-700">Every 12,000-16,000 km or 12 months</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Change Oil More Frequently If:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>Frequent short trips (under 10 km)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>Extreme temperatures (hot or cold)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>Dusty or dirty driving conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>Towing or carrying heavy loads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>Stop-and-go city traffic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">⚠️</span>
                  <span>High-performance driving</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Warning Signs You Need an Oil Change:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">🔴</span>
                  <span><strong>Oil change light</strong> or check engine light is on</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">🔴</span>
                  <span><strong>Dark, dirty oil</strong> (check dipstick - should be amber/light brown)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">🔴</span>
                  <span><strong>Engine noise</strong> or knocking sounds (metal grinding)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">🔴</span>
                  <span><strong>Oil smell</strong> inside the cabin</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xl">🔴</span>
                  <span><strong>Exhaust smoke</strong> (blue or gray smoke)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Oil Change FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does an oil change take?',
                answer: 'A professional oil change typically takes 30-45 minutes, including the multi-point inspection. Quick-lube shops may be faster (15-30 minutes) but often skip the thorough inspection. Schedule appointments to avoid wait times.'
              },
              {
                question: 'Do I really need to change oil every 5,000 km?',
                answer: 'It depends on your oil type and driving conditions. Modern synthetic oils can last 12,000-16,000 km. Check your owner\'s manual for manufacturer recommendations. The old "3,000 mile" rule is outdated for most vehicles with synthetic oil.'
              },
              {
                question: 'Can I switch between conventional and synthetic oil?',
                answer: 'Yes, you can safely switch between conventional and synthetic oil at any time. There\'s no need to flush the engine. However, once you switch to synthetic, it\'s best to continue using it for optimal protection.'
              },
              {
                question: 'What happens if I don\'t change my oil?',
                answer: 'Skipping oil changes causes oil to break down, losing its lubricating properties. This leads to increased friction, overheating, sludge buildup, and eventually catastrophic engine failure requiring $5,000-10,000+ in repairs or replacement.'
              },
              {
                question: 'Should I get a tire rotation with my oil change?',
                answer: 'Yes! Oil change and tire rotation intervals align perfectly (every 8,000-10,000 km). Combining services saves time and many shops offer package deals. It\'s an efficient way to maintain both your engine and tires.'
              },
              {
                question: 'Is synthetic oil worth the extra cost?',
                answer: 'Yes, for most drivers. Synthetic oil lasts 2-3x longer than conventional, provides better protection, and improves fuel economy. The higher upfront cost is offset by fewer changes needed. Total annual cost is often similar or lower.'
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
            Need an Oil Change?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering fast, professional oil change services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Oil Change Services
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
