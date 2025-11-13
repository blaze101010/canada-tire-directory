import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Winter Tires Canada | Best Winter Tire Prices & Installation | TireShopPro.ca',
  description: `Find winter tires at ${siteConfig.totalShops} tire shops across Canada. Expert winter tire selection, installation, changeover, and storage services. Stay safe in Canadian winters.`,
  keywords: 'winter tires Canada, winter tire installation, winter tire changeover, winter tire storage, snow tires, studded tires',
  openGraph: {
    title: 'Winter Tire Services in Canada | TireShopPro.ca',
    description: 'Find winter tires and installation services near you. Expert winter tire selection, changeover, and storage across Canada.',
    url: `${siteConfig.url}/services/winter-tires`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function WinterTiresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">❄️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Winter Tire Services in Canada
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Stay safe on Canadian roads with winter tires from tire shops across the country. Expert selection, installation, changeover, and storage services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Winter Tires Near Me
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

      {/* Why Winter Tires */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Winter Tires Are Essential in Canada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Winter tires are specifically designed for cold weather performance, providing critical safety benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🌡️',
                title: 'Cold Temperature Compound',
                description: 'Stays flexible in temperatures below 7°C (45°F), maintaining grip when all-seasons harden'
              },
              {
                icon: '🔒',
                title: 'Improved Braking',
                description: 'Up to 50% shorter stopping distance on snow and ice compared to all-season tires'
              },
              {
                icon: '🌨️',
                title: 'Snow & Ice Traction',
                description: 'Specialized tread patterns and sipes bite into snow and ice for better acceleration and cornering'
              },
              {
                icon: '⚖️',
                title: 'Required by Law',
                description: 'Mandatory in Quebec and parts of BC. Required on mountain highways across Canada'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-blue-50 rounded-xl p-6 shadow-lg text-center animate-scale-in stagger-${index + 1}`}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Winter Tire Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🛞',
                title: 'Winter Tire Sales',
                description: 'Wide selection of top winter tire brands including Michelin, Bridgestone, Goodyear, and more',
                price: '$100-300 per tire'
              },
              {
                icon: '🔧',
                title: 'Installation & Mounting',
                description: 'Professional mounting, balancing, and installation of your winter tires',
                price: '$80-150 for 4 tires'
              },
              {
                icon: '🔄',
                title: 'Seasonal Changeover',
                description: 'Swap between winter and summer tires. Many shops offer appointment booking',
                price: '$60-100 for 4 tires'
              },
              {
                icon: '📦',
                title: 'Tire Storage',
                description: 'Climate-controlled storage for your off-season tires (summer or winter)',
                price: '$80-150 per season'
              },
              {
                icon: '💎',
                title: 'Tire & Rim Packages',
                description: 'Complete winter setup with dedicated rims for easier seasonal swaps',
                price: 'Varies by vehicle'
              },
              {
                icon: '🔍',
                title: 'Inspection & Consultation',
                description: 'Expert advice on the best winter tires for your vehicle and driving needs',
                price: 'Usually free'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg animate-fade-in stagger-${index + 1}`}
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

      {/* When to Install */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            When to Install Winter Tires
          </h2>

          <div className="bg-blue-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The 7°C Rule</h3>
            <p className="text-lg text-gray-700 mb-4">
              Install winter tires when temperatures consistently drop below <strong>7°C (45°F)</strong>. At this temperature, winter tire rubber compounds provide better traction than all-season tires.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">🗓️ Recommended Installation Dates</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>BC:</strong> Mid-October to Early November</li>
                  <li><strong>Alberta:</strong> Mid-October</li>
                  <li><strong>Saskatchewan/Manitoba:</strong> Early October</li>
                  <li><strong>Ontario:</strong> Late October to Early November</li>
                  <li><strong>Quebec:</strong> Before December 1 (legally required)</li>
                  <li><strong>Atlantic Canada:</strong> Late October to Early November</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">🌸 When to Remove Winter Tires</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>When temperatures stay above 7°C consistently</li>
                  <li>Typically late March to mid-April</li>
                  <li>Don't wait too long - warm weather wears winter tires faster</li>
                  <li>Check weather forecasts for late season snowstorms</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-orange-800">Pro Tip:</strong> Book your winter tire installation appointment 2-3 weeks in advance. Tire shops get extremely busy in October and November, and you may face long wait times if you wait until the first snowfall.
            </p>
          </div>
        </div>
      </section>

      {/* Top Winter Tire Brands */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Top Winter Tire Brands
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                tier: 'Premium',
                brands: ['Michelin X-Ice', 'Bridgestone Blizzak', 'Continental WinterContact'],
                price: '$150-300 per tire',
                features: ['Best snow/ice performance', 'Longest tread life', 'Quietest ride', 'Advanced technology']
              },
              {
                tier: 'Mid-Range',
                brands: ['Goodyear UltraGrip', 'Pirelli Winter Sottozero', 'Yokohama IceGuard'],
                price: '$100-180 per tire',
                features: ['Excellent winter traction', 'Good value', 'Reliable performance', 'Popular choice']
              },
              {
                tier: 'Budget-Friendly',
                brands: ['General Altimax Arctic', 'Hankook Winter iPike', 'Firestone WinterForce'],
                price: '$80-130 per tire',
                features: ['Basic winter safety', 'Best for budget', 'Adequate traction', 'Entry-level option']
              }
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg ${index === 1 ? 'border-2 border-blue-400' : ''}`}
              >
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.tier}</h3>
                <div className="text-xl font-bold text-blue-600 mb-4">{category.price}</div>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Popular Models:</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {category.brands.map((brand, idx) => (
                      <li key={idx}>• {brand}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Key Features:</p>
                  <ul className="space-y-1 text-gray-600 text-sm">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Canadian Winter Tire Laws
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🍁 Quebec (Mandatory)</h3>
              <p className="text-gray-700 mb-2">
                Winter tires are <strong>legally required</strong> from <strong>December 1 to March 15</strong> for all passenger vehicles and taxis. Fines up to $300 for non-compliance.
              </p>
              <p className="text-sm text-gray-600">
                Must display the three-peaked mountain/snowflake symbol or M+S marking with minimum 3.5mm tread depth.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🏔️ British Columbia</h3>
              <p className="text-gray-700 mb-2">
                Winter tires <strong>required on designated highways</strong> (marked with signs) from <strong>October 1 to March 31</strong>.
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mt-2">
                <li>• Applies to most mountain highways and routes</li>
                <li>• Must have M+S or mountain/snowflake symbol</li>
                <li>• Minimum 3.5mm tread depth required</li>
                <li>• Fines $121 and you may be turned back</li>
              </ul>
            </div>

            <div className="bg-gray-50 border-l-4 border-gray-400 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📋 Other Provinces</h3>
              <p className="text-gray-700 mb-3">
                While not legally required, winter tires are <strong>strongly recommended</strong> in:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Ontario</li>
                    <li>• Alberta</li>
                    <li>• Saskatchewan</li>
                  </ul>
                </div>
                <div>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Manitoba</li>
                    <li>• Atlantic Provinces</li>
                    <li>• Territories</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Note: Many insurance companies offer winter tire discounts (typically 5-10%) when winter tires are installed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Winter Tire FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How much do winter tires cost in Canada?',
                answer: 'Winter tire prices range from $80-130 for budget options, $100-180 for mid-range, and $150-300+ for premium brands. A complete set of four winter tires typically costs $400-1200. Add $80-150 for installation and balancing. Consider dedicated rims ($300-800) to save on changeover costs long-term.'
              },
              {
                question: 'Should I get dedicated winter rims?',
                answer: 'Yes, dedicated rims are highly recommended. While there\'s an upfront cost ($300-800), you\'ll save money on seasonal changeovers (which cost $60-100 twice yearly). Steel rims are cheapest and work well for winter. Bonus: you can easily swap tires yourself at home with a jack.'
              },
              {
                question: 'Can I just install 2 winter tires instead of 4?',
                answer: 'No, this is dangerous and not recommended. Installing only 2 winter tires creates handling imbalance. If you put them on front (FWD), the rear will slide out in corners. If on rear (RWD), you can\'t steer or brake effectively. Always install 4 winter tires for balanced, safe performance.'
              },
              {
                question: 'Are all-weather tires as good as winter tires?',
                answer: 'All-weather tires (with 3-peak mountain symbol) meet legal requirements but don\'t match dedicated winter tire performance. Winter tires have softer rubber compounds and more aggressive tread for superior snow/ice traction. All-weather tires are a compromise - better than all-seasons in winter, but not as good as true winter tires.'
              },
              {
                question: 'How long do winter tires last?',
                answer: 'Winter tires typically last 4-6 seasons (about 40,000-60,000 km) depending on driving habits, storage, and maintenance. Check tread depth annually - replace when below 4/32". Store tires properly in cool, dry place out of sunlight to maximize lifespan. Proper inflation and rotation extend life.'
              },
              {
                question: 'Do winter tires really make a difference?',
                answer: 'Absolutely. Tests show winter tires reduce stopping distance by up to 50% on ice and snow compared to all-season tires. They provide better acceleration, cornering, and control in cold weather (below 7°C). Insurance claims data shows significantly fewer winter accidents for vehicles with winter tires.'
              },
              {
                question: 'What do I look for when buying winter tires?',
                answer: 'Look for: 1) Three-peaked mountain snowflake symbol (exceeds industry standards), 2) Appropriate size for your vehicle (check manual or driver door jamb), 3) Good reviews for your climate, 4) Adequate tread depth if buying used (minimum 7/32" remaining), 5) Reputable brands known for winter performance.'
              },
              {
                question: 'Should I get studded winter tires?',
                answer: 'Studded tires provide the best ice traction but are restricted or banned in many provinces (not allowed in Ontario, southern Quebec cities, prohibited certain dates in others). They\'re noisy on dry pavement and damage roads. Modern studless winter tires (like Blizzak, X-Ice) perform nearly as well on ice and are legal everywhere.'
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
      <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for Winter?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you for winter tire sales, installation, and changeover services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Winter Tires Now
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
