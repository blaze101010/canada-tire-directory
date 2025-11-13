import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Rotation Services Near Me | Extend Tire Life | TireShopPro.ca',
  description: `Find tire rotation services at ${siteConfig.totalShops} tire shops across Canada. Regular rotation extends tire life and improves wear. Professional service from $20-50.`,
  keywords: 'tire rotation near me, tire rotation service, tire rotation cost, tire rotation pattern, when to rotate tires',
  openGraph: {
    title: 'Professional Tire Rotation Services | TireShopPro.ca',
    description: 'Extend tire life and improve wear with regular tire rotation. Find professional tire rotation services near you.',
    url: `${siteConfig.url}/services/tire-rotation`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function TireRotationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🔄</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Tire Rotation Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Extend tire life by up to 20% with regular tire rotation services from tire shops across Canada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Tire Rotation Near Me
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
              What's Included in Tire Rotation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tire rotation service includes comprehensive inspection and proper rotation patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🔄',
                title: 'Pattern Rotation',
                description: 'Proper rotation pattern based on your vehicle\'s drivetrain (FWD, RWD, AWD)'
              },
              {
                icon: '💨',
                title: 'Pressure Check',
                description: 'Tire pressure inspection and adjustment to manufacturer specifications'
              },
              {
                icon: '🔍',
                title: 'Visual Inspection',
                description: 'Complete check for uneven wear, damage, and embedded objects'
              },
              {
                icon: '🔧',
                title: 'Torque Check',
                description: 'Proper lug nut torquing to prevent loosening and ensure safety'
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
            Tire Rotation Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Rotation</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$20-30</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>4-tire rotation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Pressure check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Visual inspection</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Recommended
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Full Service</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$35-50</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Professional rotation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Balance check</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Complete inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Torque verification</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Free with Service</h3>
              <div className="text-3xl font-bold text-green-600 mb-4">$0</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>With tire purchase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>With oil change (some shops)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Warranty included</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Money-Saving Tips:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span>Ask about free rotation with tire purchase</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span>Combine with oil change to save time and money</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span>Many dealerships offer free rotation for new cars</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <span>Check if your warranty covers regular rotations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rotation Patterns Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Rotation Patterns
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Forward Cross (FWD)</h3>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 text-center">
                <div className="text-4xl mb-2">🚗</div>
                <p className="text-sm text-gray-600">Front to back (same side)</p>
                <p className="text-sm text-gray-600">Rear crosses to front</p>
              </div>
              <p className="text-gray-700 text-sm">
                Most common pattern for front-wheel drive vehicles. Front tires move straight back, rear tires cross to opposite front positions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rearward Cross (RWD)</h3>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 text-center">
                <div className="text-4xl mb-2">🚙</div>
                <p className="text-sm text-gray-600">Rear to front (same side)</p>
                <p className="text-sm text-gray-600">Front crosses to rear</p>
              </div>
              <p className="text-gray-700 text-sm">
                Standard pattern for rear-wheel drive vehicles. Rear tires move straight forward, front tires cross to opposite rear positions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">X-Pattern (AWD)</h3>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 text-center">
                <div className="text-4xl mb-2">🚐</div>
                <p className="text-sm text-gray-600">All tires cross</p>
                <p className="text-sm text-gray-600">Diagonal swap</p>
              </div>
              <p className="text-gray-700 text-sm">
                Used for all-wheel drive and some 4WD vehicles. All four tires cross to opposite corners for even wear distribution.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-orange-800">Important:</strong> Directional tires (with specific tread direction) and staggered fitments (different size front/rear) require different rotation patterns. Always consult your tire professional for the correct pattern for your vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Benefits of Regular Tire Rotation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⏱️',
                title: 'Extend Tire Life',
                description: 'Regular rotation can extend tire life by 15-20%, potentially adding 10,000-15,000 km to your tires.'
              },
              {
                icon: '💰',
                title: 'Save Money',
                description: 'Spending $30-50 on rotation saves hundreds on premature tire replacement. Great return on investment.'
              },
              {
                icon: '🛞',
                title: 'Even Wear',
                description: 'Promotes uniform tread wear across all tires, preventing one tire from wearing faster than others.'
              },
              {
                icon: '🚗',
                title: 'Better Performance',
                description: 'Evenly worn tires provide better traction, handling, and braking performance in all conditions.'
              },
              {
                icon: '🔇',
                title: 'Reduced Noise',
                description: 'Prevent uneven wear patterns that cause road noise, cupping, and vibrations.'
              },
              {
                icon: '✅',
                title: 'Maintain Warranty',
                description: 'Most tire warranties require regular rotation. Keep records to ensure warranty coverage.'
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

      {/* When to Rotate */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            When Should You Rotate Your Tires?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">General Guidelines</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span><strong>Every 8,000-10,000 km</strong> (5,000-7,000 miles) for most vehicles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span><strong>Every 6 months</strong> if you drive less than average</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span><strong>With every oil change</strong> (typically 5,000-8,000 km)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3">•</span>
                  <span><strong>Check owner's manual</strong> for manufacturer recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Signs You Need Rotation</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-600 text-xl mr-3">⚠️</span>
                  <span>Uneven tread wear between tires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 text-xl mr-3">⚠️</span>
                  <span>Vibration or pulling while driving</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 text-xl mr-3">⚠️</span>
                  <span>Increased road noise from tires</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 text-xl mr-3">⚠️</span>
                  <span>It's been over 10,000 km since last rotation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800 mb-3">
              <strong className="text-blue-800">Pro Tip:</strong> Combine tire rotation with other maintenance services to save time:
            </p>
            <ul className="space-y-2 text-gray-700 ml-4">
              <li>• Schedule with oil changes (same interval)</li>
              <li>• Add wheel alignment check if you hit potholes</li>
              <li>• Request tire balancing if you feel vibrations</li>
              <li>• Have brakes inspected while wheels are off</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Tire Rotation FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How often should I rotate my tires?',
                answer: 'Most manufacturers recommend rotating tires every 8,000-10,000 km (5,000-7,000 miles) or every 6 months, whichever comes first. Check your owner\'s manual for specific recommendations. A good rule of thumb is to rotate with every other oil change.'
              },
              {
                question: 'Can I rotate my tires myself?',
                answer: 'Yes, if you have a jack, jack stands, and a torque wrench. However, professional shops have hydraulic lifts for safety and speed, ensure proper torque specifications, and inspect for issues you might miss. Most shops charge $20-50, making professional service worthwhile.'
              },
              {
                question: 'Do I need to balance tires when rotating?',
                answer: 'Not necessarily every time. Tire rotation doesn\'t require balancing unless you notice vibrations or it\'s been 20,000+ km. However, many shops include a balance check with rotation. If tires need balancing, it typically adds $40-60 to the cost.'
              },
              {
                question: 'What happens if I never rotate my tires?',
                answer: 'Without rotation, front tires on FWD vehicles can wear 2-3 times faster than rear tires, requiring early replacement. You\'ll need to buy tires sooner (wasting money), experience reduced traction and handling, potentially void tire warranties, and risk uneven wear causing vibrations and noise.'
              },
              {
                question: 'Should I rotate my tires if they\'re directional?',
                answer: 'Yes, but directional tires (with arrow marking) can only be rotated front-to-back on the same side, not crossed. Some performance vehicles have staggered fitments (different front/rear sizes) that can\'t be rotated at all. Consult your tire technician.'
              },
              {
                question: 'Do AWD vehicles need more frequent rotation?',
                answer: 'Yes, all-wheel drive vehicles should rotate tires more frequently (every 5,000-8,000 km) because all four tires receive power. Uneven tire diameter on AWD can damage the drivetrain, so keeping tires evenly worn is critical.'
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
            Ready to Rotate Your Tires?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering professional tire rotation services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Rotation Services
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
