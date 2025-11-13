import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Balancing Services Near Me | Vibration-Free Driving | TireShopPro.ca',
  description: `Find tire balancing services at ${siteConfig.totalShops} tire shops across Canada. Professional wheel balancing eliminates vibrations for smooth driving. From $15-25 per tire.`,
  keywords: 'tire balancing near me, wheel balancing, tire balance cost, vibration fix, tire balancing service',
  openGraph: {
    title: 'Professional Tire Balancing Services | TireShopPro.ca',
    description: 'Eliminate vibrations and extend tire life with professional tire balancing. Find tire balancing services near you.',
    url: `${siteConfig.url}/services/tire-balancing`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function TireBalancingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">⚙️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tire Balancing Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Eliminate vibrations and enjoy smooth, comfortable driving with expert tire balancing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Tire Balancing Near Me
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
              What's Included in Tire Balancing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tire balancing uses computerized equipment to ensure perfect weight distribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚙️',
                title: 'Dynamic Balancing',
                description: 'Computerized balancing machine spins tire at high speed to detect imbalances'
              },
              {
                icon: '⚖️',
                title: 'Weight Placement',
                description: 'Precision placement of small weights on rim to counterbalance heavy spots'
              },
              {
                icon: '🎯',
                title: 'Vibration Elimination',
                description: 'Corrects imbalances that cause steering wheel shake and ride discomfort'
              },
              {
                icon: '🚗',
                title: 'Test Drive',
                description: 'Verification test drive at highway speeds to confirm smooth operation'
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
            Tire Balancing Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Per Tire</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$15-25</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Single tire balance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Weight installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Computer analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Best Value
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All Four Tires</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$60-100</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>4-tire balance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Complete service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Valve stem check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Test drive included</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">With Installation</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">Included</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>With tire purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>With mounting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>New tire package</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Additional Services Often Bundled:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">+</span>
                <span>Tire rotation ($20-50 extra)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">+</span>
                <span>Wheel alignment check (free-$40)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">+</span>
                <span>Valve stem replacement ($5-10 per tire)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">+</span>
                <span>TPMS service ($5-15 per sensor)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Balancing is Important */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Tire Balancing is Important
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🚗',
                title: 'Smooth Ride',
                description: 'Eliminates vibrations in steering wheel, seat, and floorboard for comfortable driving at all speeds.'
              },
              {
                icon: '🛞',
                title: 'Extended Tire Life',
                description: 'Prevents uneven wear patterns and cupping that reduce tire lifespan by thousands of kilometers.'
              },
              {
                icon: '🔧',
                title: 'Protect Components',
                description: 'Prevents premature wear on bearings, suspension, and steering components caused by vibrations.'
              },
              {
                icon: '⛽',
                title: 'Better Fuel Economy',
                description: 'Balanced tires roll more efficiently, reducing rolling resistance and improving gas mileage.'
              },
              {
                icon: '🔇',
                title: 'Reduced Noise',
                description: 'Eliminates humming, buzzing, or thumping sounds from unbalanced tires at highway speeds.'
              },
              {
                icon: '🎯',
                title: 'Improved Handling',
                description: 'Better vehicle control, especially at highway speeds, with balanced weight distribution.'
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

      {/* Signs You Need Balancing */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Signs Your Tires Need Balancing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                icon: '📳',
                title: 'Steering Wheel Vibration',
                description: 'Most common sign - steering wheel shakes at 50-70 km/h, worsens at highway speeds'
              },
              {
                icon: '💺',
                title: 'Seat or Floor Vibration',
                description: 'Feel vibrations through seat, floor, or gas pedal, especially at higher speeds'
              },
              {
                icon: '🛞',
                title: 'Uneven Tire Wear',
                description: 'Cupping, scalloping, or flat spots on tire tread indicating balance issues'
              },
              {
                icon: '🔊',
                title: 'Unusual Tire Noise',
                description: 'Humming, buzzing, or thumping sounds that increase with vehicle speed'
              },
              {
                icon: '⚖️',
                title: 'Poor Handling',
                description: 'Vehicle pulls to one side or feels unstable, especially at highway speeds'
              },
              {
                icon: '⛽',
                title: 'Decreased Fuel Economy',
                description: 'Noticeable drop in gas mileage without other obvious causes'
              }
            ].map((sign, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-gray-50 rounded-lg border-l-4 border-orange-500"
              >
                <div className="text-4xl mr-4">{sign.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{sign.title}</h3>
                  <p className="text-gray-600 text-sm">{sign.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-blue-800">Important:</strong> If you experience vibrations, don't ignore them. Driving on unbalanced tires can damage suspension components and lead to expensive repairs. Get your tires balanced as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* When to Balance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            When Should You Balance Your Tires?
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">🆕</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">With New Tires</h3>
                  <p className="text-gray-700">
                    Always balance new tires during installation. Even new tires have slight weight variations that need correction.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">🔄</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Every 10,000-15,000 km</h3>
                  <p className="text-gray-700">
                    Regular balancing as preventive maintenance. Combine with tire rotation for efficiency and cost savings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">🛞</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">After Tire Repair</h3>
                  <p className="text-gray-700">
                    Whenever a tire is removed from the rim for repair or replacement. The tire needs rebalancing after remounting.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">💥</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">After Impact</h3>
                  <p className="text-gray-700">
                    Hit a pothole, curb, or large debris? Get balance checked. Impact can knock off weights or damage tires.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">📳</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">When You Feel Vibrations</h3>
                  <p className="text-gray-700">
                    Any time you notice steering wheel shake or vehicle vibrations, especially at highway speeds.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start">
                <span className="text-3xl mr-4">❄️</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Seasonal Tire Change</h3>
                  <p className="text-gray-700">
                    Check balance when switching between winter and summer tires. Stored tires may develop flat spots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Balancing vs Alignment */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Balancing vs Wheel Alignment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 border-2 border-blue-400">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">⚙️ Tire Balancing</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>What it does:</strong> Corrects weight imbalances in tire and wheel assembly</p>
                <p><strong>How:</strong> Small weights attached to rim to counterbalance heavy spots</p>
                <p><strong>Symptoms:</strong> Vibrations at highway speeds, especially in steering wheel</p>
                <p><strong>Cost:</strong> $60-100 for 4 tires</p>
                <p><strong>Frequency:</strong> Every 10,000-15,000 km or as needed</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-400">
              <h3 className="text-2xl font-bold text-green-900 mb-4">⚖️ Wheel Alignment</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>What it does:</strong> Adjusts angle of wheels relative to vehicle and road</p>
                <p><strong>How:</strong> Adjusts camber, caster, and toe angles to specifications</p>
                <p><strong>Symptoms:</strong> Vehicle pulls to side, uneven tire wear, off-center steering</p>
                <p><strong>Cost:</strong> $80-150</p>
                <p><strong>Frequency:</strong> Every 2-3 years or after hitting curbs/potholes</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3">💡 Quick Reference:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-2">Vibration at speed?</span>
                <span>Likely needs balancing</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">Vehicle pulls to side?</span>
                <span>Likely needs alignment</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">Uneven tire wear?</span>
                <span>Could be either - get both checked</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Balancing FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does tire balancing take?',
                answer: 'Professional tire balancing typically takes 30-45 minutes for all four tires. Each tire takes about 5-10 minutes on the balancing machine. If combined with tire rotation, expect 45-60 minutes total. Many shops offer while-you-wait service.'
              },
              {
                question: 'How much does tire balancing cost?',
                answer: 'Tire balancing costs $15-25 per tire, or $60-100 for all four tires. Balancing is usually included free with new tire purchases or installation. Some shops offer package deals when combined with rotation ($80-120 total).'
              },
              {
                question: 'Do I need to balance my tires every time I rotate them?',
                answer: 'Not necessarily. Balance only if you notice vibrations or it\'s been 20,000+ km. However, many shops include a balance check with rotation. If tires are already balanced, they may just verify rather than rebalance (often no extra charge).'
              },
              {
                question: 'Can unbalanced tires damage my car?',
                answer: 'Yes. Unbalanced tires cause vibrations that accelerate wear on wheel bearings, suspension components, and steering parts. They also cause uneven tire wear, potentially requiring early tire replacement. Long-term driving on unbalanced tires can lead to expensive repairs.'
              },
              {
                question: 'What causes tires to become unbalanced?',
                answer: 'Common causes include: weights falling off from impact or corrosion, hitting potholes/curbs, uneven tire wear, getting tires repaired or remounted, snow/ice buildup in wheel, and normal weight distribution changes over time.'
              },
              {
                question: 'Can I balance tires myself?',
                answer: 'Not recommended. Tire balancing requires specialized computerized equipment that costs thousands of dollars and expertise to operate correctly. DIY balancing products (beads, liquids) exist but don\'t work as well as professional computer balancing. Professional service is worth the $15-25 per tire.'
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
            Experiencing Vibrations?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering professional tire balancing services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Balancing Services
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
