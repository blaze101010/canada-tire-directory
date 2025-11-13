import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Brake Service & Repair Near Me | Brake Pads, Rotors, Inspection | TireShopPro.ca',
  description: `Find brake service at ${siteConfig.totalShops} tire shops across Canada. Professional brake pad replacement, rotor service, brake inspection, and repairs from $150-400.`,
  keywords: 'brake service near me, brake repair, brake pads, brake rotors, brake inspection, brake replacement',
  openGraph: {
    title: 'Professional Brake Service & Repair | TireShopPro.ca',
    description: 'Expert brake service, pad replacement, rotor machining, and brake inspection near you.',
    url: `${siteConfig.url}/services/brake-service`,
    siteName: siteConfig.name,
    type: 'website',
  },
};

export default function BrakeServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 via-red-700 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6">🛑</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Brake Service & Repair
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
              Expert brake inspection, pad replacement, and rotor service for safe, reliable stopping power
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
              >
                Find Brake Service Near Me
              </Link>
              <Link
                href="/services"
                className="inline-block bg-white text-red-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
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
              Comprehensive Brake Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional brake service includes inspection, replacement, and testing for safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🔍',
                title: 'Brake Inspection',
                description: 'Complete check of pads, rotors, calipers, brake fluid, and hydraulic system'
              },
              {
                icon: '🔧',
                title: 'Pad Replacement',
                description: 'High-quality brake pad installation with proper break-in procedure'
              },
              {
                icon: '⚙️',
                title: 'Rotor Service',
                description: 'Rotor resurfacing/machining or replacement for smooth, even braking'
              },
              {
                icon: '✅',
                title: 'Road Test',
                description: 'Pre and post-service test drive to verify proper brake operation'
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
            Brake Service Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Brake Inspection</h3>
              <div className="text-3xl font-bold text-red-600 mb-4">$30-60</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Visual inspection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Measure pad thickness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Check rotors & fluid</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-600 mr-2">•</span>
                  <span>Often free with service</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Common
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Brake Pads Only</h3>
              <div className="text-3xl font-bold text-red-600 mb-4">$150-300</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Front or rear pads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Installation & labor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Clean & lubricate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Test drive included</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pads + Rotors</h3>
              <div className="text-3xl font-bold text-red-600 mb-4">$300-600</div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Pads & rotors (axle)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Complete service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Hardware included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Full warranty</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Additional Services:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">+</span>
                <span>Brake fluid flush: $80-120</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">+</span>
                <span>Caliper replacement: $200-400 per caliper</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">+</span>
                <span>Rotor resurfacing: $20-40 per rotor</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">+</span>
                <span>All 4 wheels service: Multiply by 2</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Warning Signs You Need Brake Service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🔊',
                title: 'Squealing or Grinding',
                description: 'High-pitched squeal means pads are worn. Grinding means metal-on-metal - get service immediately!'
              },
              {
                icon: '📳',
                title: 'Vibration or Pulsing',
                description: 'Steering wheel or brake pedal vibrates when braking - usually warped rotors'
              },
              {
                icon: '🚗',
                title: 'Vehicle Pulls to Side',
                description: 'Car pulls left or right when braking indicates uneven brake wear or stuck caliper'
              },
              {
                icon: '⬇️',
                title: 'Soft or Spongy Pedal',
                description: 'Brake pedal feels soft or goes to floor - possible brake fluid leak or air in lines'
              },
              {
                icon: '💡',
                title: 'Brake Warning Light',
                description: 'Dashboard brake light indicates low fluid, worn pads, or system problem'
              },
              {
                icon: '⏱️',
                title: 'Longer Stopping Distance',
                description: 'Takes longer to stop than normal - serious safety issue, service immediately'
              },
              {
                icon: '👃',
                title: 'Burning Smell',
                description: 'Chemical or burning smell after braking indicates overheated brakes or stuck caliper'
              },
              {
                icon: '💧',
                title: 'Fluid Leak',
                description: 'Puddle of fluid near wheels or low brake fluid reservoir - dangerous leak'
              }
            ].map((sign, index) => (
              <div
                key={index}
                className="flex items-start p-6 bg-white rounded-lg shadow-md border-l-4 border-red-500"
              >
                <div className="text-4xl mr-4">{sign.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{sign.title}</h3>
                  <p className="text-gray-600 text-sm">{sign.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              <strong className="text-red-800">Safety Warning:</strong> Never ignore brake problems. Brakes are your vehicle's most critical safety system. If you notice any warning signs, get an inspection immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Why Professional Service */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Professional Brake Service?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Safety Assured',
                description: 'Professional technicians ensure proper installation and testing for your safety and your family\'s.'
              },
              {
                icon: '🔧',
                title: 'Proper Equipment',
                description: 'Specialized tools for rotor measurement, caliper service, and brake bleeding that most DIYers lack.'
              },
              {
                icon: '✅',
                title: 'Quality Parts',
                description: 'Access to OEM or high-quality aftermarket parts with warranties, not cheap online parts.'
              },
              {
                icon: '👨‍🔧',
                title: 'Expert Diagnosis',
                description: 'Trained technicians identify root causes like seized calipers or bad hoses, not just symptoms.'
              },
              {
                icon: '📋',
                title: 'Complete Inspection',
                description: 'Full brake system check including lines, fluid, ABS, and parking brake - not just pads.'
              },
              {
                icon: '💰',
                title: 'Warranty Protection',
                description: 'Parts and labor warranties provide peace of mind. DIY mistakes can cost more to fix.'
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

      {/* Brake Pad Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Types of Brake Pads
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ceramic Pads</h3>
              <div className="text-lg font-semibold text-red-600 mb-4">$60-150 per axle</div>
              <div className="space-y-3 mb-4">
                <p className="text-gray-700"><strong>Best for:</strong> Daily driving, passenger cars, quiet operation</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Quietest operation</li>
                  <li>✓ Least brake dust</li>
                  <li>✓ Long-lasting (50,000-70,000 km)</li>
                  <li>✓ Smooth, consistent braking</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Cons:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✗ Higher cost</li>
                  <li>✗ Less effective when cold</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 shadow-lg border-2 border-red-400">
              <div className="text-center mb-4">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Semi-Metallic</h3>
              <div className="text-lg font-semibold text-red-600 mb-4">$40-100 per axle</div>
              <div className="space-y-3 mb-4">
                <p className="text-gray-700"><strong>Best for:</strong> Most vehicles, all-around performance</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Excellent braking power</li>
                  <li>✓ Good heat dissipation</li>
                  <li>✓ Works well in all temps</li>
                  <li>✓ Affordable</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Cons:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✗ Noisier than ceramic</li>
                  <li>✗ More brake dust</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Performance Pads</h3>
              <div className="text-lg font-semibold text-red-600 mb-4">$100-300 per axle</div>
              <div className="space-y-3 mb-4">
                <p className="text-gray-700"><strong>Best for:</strong> High-performance, towing, racing</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Pros:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Maximum stopping power</li>
                  <li>✓ Best high-temp performance</li>
                  <li>✓ Fade resistant</li>
                  <li>✓ Track-ready</li>
                </ul>
                <h4 className="font-bold text-gray-900 mt-4">Cons:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✗ Most expensive</li>
                  <li>✗ Noisy</li>
                  <li>✗ Hard on rotors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Brake Service FAQs
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'How often should I replace brake pads?',
                answer: 'Brake pads typically last 40,000-100,000 km depending on driving style and pad type. City driving wears brakes faster. Get brakes inspected annually or if you notice any warning signs. Most shops check brakes during oil changes.'
              },
              {
                question: 'How much does brake service cost?',
                answer: 'Brake pad replacement costs $150-300 per axle (front or rear). Pads plus rotors cost $300-600 per axle. Full brake job (all 4 wheels, pads and rotors) costs $600-1200. Prices vary by vehicle - trucks and luxury cars cost more.'
              },
              {
                question: 'Should I replace all 4 brakes at once?',
                answer: 'Not necessarily. Brakes wear at different rates - front brakes do 60-70% of stopping, so they wear faster. Replace brakes in pairs (both fronts or both rears) for even braking. If rears are still good when fronts need service, you can wait.'
              },
              {
                question: 'Do I need to replace rotors with pads?',
                answer: 'Not always. If rotors are within thickness specs and not warped/scored, they can be resurfaced ($20-40 per rotor) or reused. However, new rotors ($50-150 each) often provide better performance and may last longer. Technicians will measure and advise.'
              },
              {
                question: 'How long does brake service take?',
                answer: 'Simple brake pad replacement takes 1-2 hours per axle. Pads plus rotors takes 2-3 hours. Full brake job (all 4 wheels) takes 3-4 hours. Add time for brake fluid flush or caliper work. Most shops offer same-day service with appointment.'
              },
              {
                question: 'What causes brake rotors to warp?',
                answer: 'Warped rotors are caused by excessive heat from aggressive braking, riding brakes downhill, towing heavy loads, or cooling unevenly (like driving through deep water when hot). Warped rotors cause pedal pulsing and should be replaced or resurfaced.'
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
      <section className="py-16 bg-gradient-to-br from-red-800 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Brake Service?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Find tire shops near you offering professional brake inspection and repair
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all"
            >
              Find Brake Service Now
            </Link>
            <Link
              href="/services"
              className="inline-block bg-white text-red-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
