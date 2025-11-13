import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Wheel Alignment Services Near Me | Professional 4-Wheel Alignment | TireShopPro.ca',
  description: `Find professional wheel alignment services at ${siteConfig.totalShops} tire shops across Canada. Expert 4-wheel alignment, suspension checks, and steering adjustments from $80-150.`,
  keywords: 'wheel alignment near me, 4 wheel alignment, tire alignment, alignment service, wheel alignment cost, alignment check',
  openGraph: {
    title: 'Professional Wheel Alignment Services | TireShopPro.ca',
    description: 'Find expert wheel alignment services near you. Improve handling, tire life, and fuel efficiency with professional alignment.',
    url: `${siteConfig.url}/services/wheel-alignment`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function WheelAlignmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">⚖️</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Wheel Alignment Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Improve handling, extend tire life, and enhance fuel efficiency with expert wheel alignment services from tire shops across Canada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Alignment Services Near Me
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
              What's Included in Wheel Alignment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional wheel alignment services include comprehensive checks and adjustments to ensure optimal vehicle performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🔧',
                title: '4-Wheel Alignment',
                description: 'Complete alignment of all four wheels including camber, caster, and toe adjustments'
              },
              {
                icon: '🔍',
                title: 'Suspension Inspection',
                description: 'Thorough check of suspension components, bushings, and control arms'
              },
              {
                icon: '🎯',
                title: 'Steering Adjustment',
                description: 'Precise steering wheel centering and tie rod adjustment for optimal handling'
              },
              {
                icon: '🚗',
                title: 'Test Drive',
                description: 'Pre and post-alignment test drive to verify improvements and handling'
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
            Wheel Alignment Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Front-End Alignment</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$60-90</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Front wheels only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Toe adjustment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Basic inspection</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">4-Wheel Alignment</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$80-150</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>All four wheels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Complete adjustment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Test drive included</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Alignment Check</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">$20-40</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Diagnostic only</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Printout report</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>No adjustments</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Factors Affecting Alignment Cost:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Vehicle type (car vs truck/SUV)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Front-wheel vs all-wheel drive</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Additional repairs needed</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Location and shop rates</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Professional Alignment */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Professional Wheel Alignment?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🛞',
                title: 'Extend Tire Life',
                description: 'Proper alignment can increase tire lifespan by up to 50%, saving you hundreds on premature tire replacement.'
              },
              {
                icon: '⛽',
                title: 'Improve Fuel Economy',
                description: 'Correct alignment reduces rolling resistance, improving gas mileage by up to 10% and saving money at the pump.'
              },
              {
                icon: '🚗',
                title: 'Better Handling',
                description: 'Eliminate pulling, drifting, and steering wheel vibration for a smoother, safer driving experience.'
              },
              {
                icon: '🔒',
                title: 'Enhanced Safety',
                description: 'Proper alignment ensures optimal tire contact with the road, improving braking and emergency handling.'
              },
              {
                icon: '🛠️',
                title: 'Prevent Damage',
                description: 'Avoid premature wear on suspension components, steering parts, and other expensive systems.'
              },
              {
                icon: '📊',
                title: 'Computerized Precision',
                description: 'Modern alignment equipment provides exact measurements and adjustments to factory specifications.'
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

      {/* Signs You Need Alignment */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Signs You Need Wheel Alignment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Vehicle pulls to the left or right while driving',
              'Steering wheel is off-center when driving straight',
              'Uneven or rapid tire wear on inside or outside edges',
              'Steering wheel vibrates or shakes at highway speeds',
              'Squealing tires when turning corners',
              'After hitting a curb, pothole, or road debris',
              'Following suspension or steering repairs',
              'New tire installation (recommended)'
            ].map((sign, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-orange-600 text-2xl mr-3">⚠️</span>
                <span className="text-gray-800">{sign}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-blue-800">Expert Tip:</strong> Get your alignment checked annually or every 12,000 miles, even if you don't notice symptoms. Preventive alignment saves money on tire replacement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Wheel Alignment FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How long does a wheel alignment take?',
                answer: 'A professional wheel alignment typically takes 45-60 minutes. This includes inspection, adjustment, and a test drive. If additional repairs are needed (like replacing worn suspension parts), it may take longer.'
              },
              {
                question: 'What\'s the difference between 2-wheel and 4-wheel alignment?',
                answer: '2-wheel (front-end) alignment adjusts only the front wheels and is suitable for vehicles with solid rear axles. 4-wheel alignment adjusts all four wheels and is necessary for front-wheel drive, all-wheel drive, and most modern vehicles with independent rear suspension.'
              },
              {
                question: 'How often should I get a wheel alignment?',
                answer: 'Manufacturers typically recommend alignment checks every 2-3 years or 30,000 miles. However, you should get it checked sooner if you hit a curb, pothole, or notice symptoms like pulling or uneven tire wear.'
              },
              {
                question: 'Can I drive with bad alignment?',
                answer: 'While you can technically drive with poor alignment, it\'s not recommended. Bad alignment causes rapid, uneven tire wear, reduced fuel economy, poor handling, and potential safety issues. It will cost more in the long run due to premature tire replacement.'
              },
              {
                question: 'Do I need an alignment with new tires?',
                answer: 'Yes, it\'s highly recommended. Installing new tires on a vehicle with poor alignment will cause the new tires to wear unevenly and prematurely. Most tire shops include a free alignment check with new tire purchases.'
              },
              {
                question: 'What causes wheels to go out of alignment?',
                answer: 'Common causes include hitting potholes, curbs, or speed bumps; worn suspension components; minor accidents; heavy loads; and normal wear over time. Even regular driving on rough roads can gradually affect alignment.'
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
            Need Wheel Alignment Service?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Find tire shops near you offering professional wheel alignment services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Alignment Services
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
