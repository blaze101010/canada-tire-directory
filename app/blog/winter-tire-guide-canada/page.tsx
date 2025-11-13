import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Ultimate Winter Tire Guide for Canadian Drivers 2025 | TireShopPro.ca',
  description: 'Complete guide to winter tires in Canada: when to install, top brands, legal requirements by province, studded vs studless, cost breakdown, and where to buy. Expert advice for Canadian winters.',
  keywords: 'winter tires Canada, winter tire guide, when to install winter tires, winter tire brands, Quebec winter tire law, winter tire cost, studded tires Canada, snow tires',
  openGraph: {
    title: 'Ultimate Winter Tire Guide for Canadian Drivers 2025',
    description: 'Everything Canadian drivers need to know about winter tires: installation timing, top brands, legal requirements, and cost breakdown.',
    url: `${siteConfig.url}/blog/winter-tire-guide-canada`,
    siteName: siteConfig.name,
    type: 'article',
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Winter Tire Guide for Canada',
      },
    ],
  },
};

export default function WinterTireGuideCanadaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: 'Winter Tire Guide for Canada' }
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-800 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">❄️</div>
          <div className="absolute top-32 right-20 text-6xl">❄️</div>
          <div className="absolute bottom-20 left-1/4 text-7xl">❄️</div>
          <div className="absolute bottom-32 right-1/3 text-5xl">❄️</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-fade-in">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Complete Winter Tire Guide 2025
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The Ultimate Winter Tire Guide for Canadian Drivers
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Everything you need to know about choosing, installing, and maintaining winter tires to stay safe on Canadian roads. Expert advice for harsh Canadian winters.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">12 min read</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Updated 2025</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Canadian Focus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Canadian winters are unforgiving. From British Columbia's coastal rain and ice to the Prairies' frigid temperatures and the Maritimes' heavy snowfall, winter driving conditions across Canada demand proper preparation. The single most important thing you can do to stay safe? Install winter tires.
          </p>

          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            This comprehensive guide covers everything Canadian drivers need to know about winter tires: when to install them, which brands to choose, legal requirements by province, cost breakdowns, and where to find the best <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shops near you</Link>. Whether you're a first-time winter driver or a seasoned Canadian looking to upgrade, this guide has you covered.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
            <p className="text-gray-800 font-semibold mb-2">Why Winter Tires Matter in Canada:</p>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Up to 50% shorter stopping distance on snow and ice vs all-season tires</li>
              <li>✓ Better traction below 7°C (45°F), even on dry roads</li>
              <li>✓ Legally required in Quebec and on many BC highways</li>
              <li>✓ Can save lives—yours and others on the road</li>
              <li>✓ May qualify you for insurance discounts (typically 5-10%)</li>
            </ul>
          </div>

          {/* Section 1: Why Winter Tires Are Essential */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Winter Tires Are Essential in Canada (Not Optional)
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Many Canadian drivers ask, "Can't I just use all-season tires year-round?" The answer is technically yes in most provinces—but it's a dangerous choice. Here's why winter tires aren't just better; they're essential for Canadian winters.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Winter Tires vs All-Season Tires: The Science</h3>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-5 border-l-4 border-blue-600">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="text-2xl mr-3">🧪</span>
                    Rubber Compound
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-2"><strong>Winter Tires:</strong> Special rubber compound stays flexible and grippy in temperatures below 7°C (45°F). The softer rubber conforms to road surfaces for maximum contact.</p>
                    <p className="text-gray-700"><strong>All-Season Tires:</strong> Rubber hardens in cold temperatures below 7°C, becoming stiff like a hockey puck. This dramatically reduces grip on any surface—even dry pavement.</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border-l-4 border-green-600">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="text-2xl mr-3">🔍</span>
                    Tread Design
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-2"><strong>Winter Tires:</strong> Deeper tread blocks (typically 10-14/32") with aggressive patterns designed to bite into snow. Wider grooves channel snow and slush away from the tire.</p>
                    <p className="text-gray-700"><strong>All-Season Tires:</strong> Shallower tread optimized for dry and wet roads. Tread patterns can't effectively channel heavy snow or provide grip on ice.</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border-l-4 border-orange-600">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="text-2xl mr-3">❄️</span>
                    Sipes (Tiny Grooves)
                  </h4>
                  <div className="ml-11">
                    <p className="text-gray-700 mb-2"><strong>Winter Tires:</strong> Thousands of thin slits (sipes) cut into tread blocks. These bite into ice and create additional biting edges for traction.</p>
                    <p className="text-gray-700"><strong>All-Season Tires:</strong> Fewer sipes, designed mainly for water evacuation on wet roads. Minimal ice grip capability.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">The Numbers Don't Lie: Stopping Distance Comparison</h4>
              <p className="text-gray-700 mb-4">
                Canadian Automobile Association (CAA) testing shows dramatic differences in stopping distance from 50 km/h:
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-1">On Ice:</p>
                  <p className="text-gray-700">• All-season tires: <strong>57 meters</strong></p>
                  <p className="text-gray-700">• Winter tires: <strong>36 meters</strong></p>
                  <p className="text-red-800 font-semibold mt-2">21 meters shorter = 5+ car lengths difference!</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-gray-900 mb-1">On Packed Snow:</p>
                  <p className="text-gray-700">• All-season tires: <strong>43 meters</strong></p>
                  <p className="text-gray-700">• Winter tires: <strong>32 meters</strong></p>
                  <p className="text-red-800 font-semibold mt-2">11 meters shorter = could prevent collision</p>
                </div>
              </div>
              <p className="text-gray-700 mt-4 italic">
                That extra stopping distance could be the difference between a near-miss and a serious accident—especially with children crossing streets or in heavy traffic.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Impact: Insurance and Accident Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Studies by insurance companies and Transport Canada show:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-6">
              <li>• Vehicles with winter tires have <strong>38% fewer accidents</strong> in winter conditions</li>
              <li>• Winter tire use reduces <strong>injury collision rates by 5-11%</strong></li>
              <li>• Quebec saw a <strong>3% decrease in fatal accidents</strong> after making winter tires mandatory in 2008</li>
              <li>• Insurance companies offer discounts because winter tires demonstrably reduce claims</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
              <p className="text-gray-800">
                <strong className="text-blue-800">Bottom Line:</strong> Winter tires aren't just about snow. They perform better than all-season tires in ALL conditions when temperatures drop below 7°C—including dry pavement. If you live anywhere in Canada and drive in winter, you need winter tires. Period.
              </p>
            </div>
          </section>

          {/* Section 2: When to Install Winter Tires */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              When to Install Winter Tires in Canada: The 7°C Rule
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Timing is everything with winter tires. Install them too early and you'll wear them down on warm pavement. Wait too long and you'll be caught unprepared in the first snowfall. Here's exactly when to make the switch.
            </p>

            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-xl p-8 my-8">
              <h3 className="text-3xl font-bold mb-4 text-center">🌡️ The 7°C Rule</h3>
              <p className="text-xl text-blue-100 text-center mb-6">
                Install winter tires when daytime temperatures consistently stay below <strong className="text-white">7°C (45°F)</strong>
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <p className="text-blue-100 mb-3">
                  <strong className="text-white">Why 7°C?</strong> This is the temperature where winter tire rubber compounds begin to outperform all-season tires—even on dry roads. Below this temperature, all-season tire rubber hardens and loses grip, while winter tire rubber stays flexible.
                </p>
                <p className="text-blue-100">
                  <strong className="text-white">Pro Tip:</strong> Don't wait for the first snowfall. By that time, every tire shop will be booked solid for weeks. Install your winter tires 2-3 weeks before you expect consistent freezing temperatures.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Installation Timeline by Province</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Canada is huge, and winter arrives at different times across the country. Here's when to install winter tires based on your region:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">🏔️ British Columbia</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Mid-October to Early November</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> Late March to April</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Note:</strong> BC law requires winter tires on mountain highways from October 1 to March 31. Install early if you travel to mountain regions.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">🌾 Alberta</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Mid-October</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> Early to Mid-April</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Note:</strong> Alberta winters come early and stay late. Book your appointment by early October to avoid the rush.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">🌾 Saskatchewan & Manitoba</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Early to Mid-October</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> Mid to Late April</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Note:</strong> Prairie winters are harsh and long. Don't delay—temperatures drop quickly in fall.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">🍁 Ontario</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Late October to Early November</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> Late March to Early April</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Note:</strong> Southern Ontario can wait until November, but Northern Ontario should install by mid-October.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">⚜️ Quebec</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Before December 1 (REQUIRED BY LAW)</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> After March 15</p>
                <p className="text-sm text-red-800 mt-3 font-semibold">
                  <strong>LEGAL REQUIREMENT:</strong> All vehicles must have winter tires from December 1 to March 15. Fines up to $300 for non-compliance.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">🌊 Atlantic Provinces</h4>
                <p className="text-gray-700 mb-2"><strong>Install:</strong> Late October to Early November</p>
                <p className="text-gray-700 mb-2"><strong>Remove:</strong> Late March to Mid-April</p>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Note:</strong> Coastal regions deal with freeze-thaw cycles and ice. Winter tires are essential for safety.
                </p>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">📅 Book Your Appointment Early!</h4>
              <p className="text-gray-700 mb-3">
                Tire shops get extremely busy in October and November. Here's the reality:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Book 3-4 weeks in advance</strong> of your target installation date</li>
                <li>• <strong>September bookings</strong> often get the best selection of appointment times</li>
                <li>• <strong>First snowfall = chaos</strong>—shops get overwhelmed with desperate customers</li>
                <li>• <strong>Popular tire models</strong> can sell out if you wait too long</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Find a <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shop near you</Link> and book your winter tire installation now before the rush.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">When to Remove Winter Tires</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Remove winter tires when temperatures consistently stay above 7°C. This is typically:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6 mb-6">
              <li>• <strong>Most of Canada:</strong> Late March to mid-April</li>
              <li>• <strong>Southern Ontario/BC:</strong> Early to mid-April</li>
              <li>• <strong>Northern regions:</strong> Late April to early May</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              Don't leave winter tires on too long. Warm pavement accelerates wear on the softer rubber compound, significantly shortening their lifespan. However, watch the forecast—if a late-season snowstorm is predicted, keep your winter tires on a bit longer.
            </p>
          </section>

          {/* Section 3: Top Winter Tire Brands */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Best Winter Tire Brands for Canadian Winters
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Not all winter tires are created equal. Some excel on ice, others in deep snow, and some offer the best all-around performance. Here's a breakdown of the top winter tire brands available at <Link href="/services/winter-tires" className="text-blue-600 hover:text-blue-800 font-semibold">Canadian tire shops</Link>, organized by price tier.
            </p>

            <div className="space-y-8">
              {/* Premium Tier */}
              <div className="border-2 border-blue-400 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-gray-900">Premium Tier</h3>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-bold">$150-300/tire</span>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Bridgestone Blizzak WS90</h4>
                    <p className="text-blue-600 font-semibold mb-3">Best Overall Choice for Canada</p>
                    <p className="text-gray-700 mb-3">
                      The gold standard for ice traction. Bridgestone's Blizzak line has dominated Canadian winters for decades with their proprietary multicell compound that removes water from ice for exceptional grip.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Best-in-class ice braking</li>
                          <li>• Excellent snow traction</li>
                          <li>• Quiet, comfortable ride</li>
                          <li>• Long tread life (60,000+ km)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Daily commuters</li>
                          <li>• City and highway driving</li>
                          <li>• Icy urban conditions</li>
                          <li>• Drivers prioritizing safety</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $160-280 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Michelin X-Ice Snow</h4>
                    <p className="text-blue-600 font-semibold mb-3">Best for Longevity</p>
                    <p className="text-gray-700 mb-3">
                      Michelin's reputation for durability shines through in the X-Ice Snow. While slightly more expensive, these tires often outlast competitors by 10,000+ km, making them a smart long-term investment.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Exceptional tread life</li>
                          <li>• Strong ice and snow grip</li>
                          <li>• Maintains performance as it wears</li>
                          <li>• Fuel-efficient design</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• High-mileage drivers</li>
                          <li>• Long-term value seekers</li>
                          <li>• Highway commuters</li>
                          <li>• Eco-conscious drivers</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $170-300 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Continental WinterContact TS870</h4>
                    <p className="text-blue-600 font-semibold mb-3">Best European Engineering</p>
                    <p className="text-gray-700 mb-3">
                      Continental brings German precision to winter tires. The WinterContact series offers well-balanced performance across all winter conditions with responsive handling.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Precise steering feel</li>
                          <li>• Strong wet traction</li>
                          <li>• Balanced performance</li>
                          <li>• Good for sporty cars</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Performance vehicles</li>
                          <li>• Enthusiast drivers</li>
                          <li>• Coastal regions</li>
                          <li>• Highway driving</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $150-270 per tire depending on size</p>
                  </div>
                </div>
              </div>

              {/* Mid-Range Tier */}
              <div className="border-2 border-green-400 rounded-xl p-8 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Mid-Range Tier</h3>
                    <p className="text-green-800 font-semibold mt-1">Best Value for Most Drivers</p>
                  </div>
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-lg font-bold">$100-180/tire</span>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Goodyear UltraGrip Ice WRT</h4>
                    <p className="text-green-600 font-semibold mb-3">Best Mid-Range Value</p>
                    <p className="text-gray-700 mb-3">
                      Goodyear delivers premium-level ice grip at a mid-range price. Excellent choice for budget-conscious drivers who don't want to compromise on safety.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Strong ice performance</li>
                          <li>• Great value pricing</li>
                          <li>• Widely available</li>
                          <li>• Solid snow traction</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Budget-conscious families</li>
                          <li>• Urban/suburban drivers</li>
                          <li>• Moderate winter conditions</li>
                          <li>• First-time winter tire buyers</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $110-180 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Nokian Hakkapeliitta R5</h4>
                    <p className="text-green-600 font-semibold mb-3">Best for Deep Snow</p>
                    <p className="text-gray-700 mb-3">
                      Finnish tire maker Nokian knows winter. The Hakkapeliitta line is legendary in Scandinavia and excels in heavy snow conditions common in rural Canada.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Excellent deep snow grip</li>
                          <li>• Studless ice traction</li>
                          <li>• Eco-friendly construction</li>
                          <li>• Nordic-tested durability</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Rural/remote areas</li>
                          <li>• Heavy snowfall regions</li>
                          <li>• Prairie provinces</li>
                          <li>• Environmentally conscious</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $120-200 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Yokohama IceGuard iG53</h4>
                    <p className="text-green-600 font-semibold mb-3">Best for Quiet Ride</p>
                    <p className="text-gray-700 mb-3">
                      If winter tire noise bothers you, Yokohama's IceGuard series offers some of the quietest winter tires available while maintaining solid winter performance.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Very quiet operation</li>
                          <li>• Comfortable ride quality</li>
                          <li>• Good ice/snow balance</li>
                          <li>• Absorbs road imperfections</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Comfort-focused drivers</li>
                          <li>• Long commutes</li>
                          <li>• Luxury vehicles</li>
                          <li>• Noise-sensitive drivers</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $100-170 per tire depending on size</p>
                  </div>
                </div>
              </div>

              {/* Budget Tier */}
              <div className="border-2 border-orange-400 rounded-xl p-8 bg-gradient-to-br from-orange-50 to-yellow-50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-3xl font-bold text-gray-900">Budget-Friendly Tier</h3>
                  <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-lg font-bold">$80-130/tire</span>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 border-l-4 border-orange-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">General Altimax Arctic 12</h4>
                    <p className="text-orange-600 font-semibold mb-3">Best Budget Pick</p>
                    <p className="text-gray-700 mb-3">
                      Don't let the low price fool you. General (owned by Continental) delivers surprising performance at budget prices, making winter tires accessible to all Canadian drivers.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Very affordable</li>
                          <li>• Adequate winter safety</li>
                          <li>• Available in many sizes</li>
                          <li>• Better than all-seasons</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Tight budgets</li>
                          <li>• Older vehicles</li>
                          <li>• Low-mileage drivers</li>
                          <li>• Second vehicles</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $85-130 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-orange-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Hankook Winter iPike RS2 W429</h4>
                    <p className="text-orange-600 font-semibold mb-3">Best Budget Performance</p>
                    <p className="text-gray-700 mb-3">
                      Korean tire maker Hankook offers impressive grip-to-cost ratio. These tires punch above their weight class in winter conditions.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Good ice traction for price</li>
                          <li>• Reliable in snow</li>
                          <li>• Studdable option available</li>
                          <li>• Decent tread life</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Value seekers</li>
                          <li>• Compact cars</li>
                          <li>• Students/young drivers</li>
                          <li>• Rural drivers on budget</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $80-125 per tire depending on size</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border-l-4 border-orange-600">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Firestone WinterForce 2</h4>
                    <p className="text-orange-600 font-semibold mb-3">Most Affordable Option</p>
                    <p className="text-gray-700 mb-3">
                      Firestone's budget winter tire gets the job done without breaking the bank. Basic but effective winter safety at rock-bottom prices.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Strengths:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Lowest cost option</li>
                          <li>• Meets safety standards</li>
                          <li>• Wide availability</li>
                          <li>• Studdable for ice</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Best For:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Minimum budget</li>
                          <li>• Occasional winter use</li>
                          <li>• Beater cars</li>
                          <li>• Emergency replacement</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">Price: $80-120 per tire depending on size</p>
                  </div>
                </div>

                <div className="bg-orange-100 border-l-4 border-orange-600 p-4 rounded-r-lg mt-6">
                  <p className="text-sm text-gray-700">
                    <strong>Budget Tip:</strong> Even budget winter tires are dramatically safer than all-season tires in Canadian winters. If you can only afford budget tires, that's still infinitely better than using all-seasons. Your safety is worth the investment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">How to Choose the Right Tier for You</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Choose Premium if:</strong> You drive daily in all conditions, prioritize safety above all, or have a newer/luxury vehicle worth protecting</li>
                <li><strong>Choose Mid-Range if:</strong> You want the best balance of performance and value, drive regularly in winter, or are buying for a family vehicle</li>
                <li><strong>Choose Budget if:</strong> You're on a tight budget, have an older vehicle, drive infrequently, or need a temporary solution</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Visit <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shops in your area</Link> to see which brands they carry and get personalized recommendations based on your vehicle and driving needs.
              </p>
            </div>
          </section>

          {/* Section 4: Studded vs Studless */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Studded vs Studless Winter Tires: Which is Right for You?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              One of the most common questions Canadian drivers ask is whether they should get studded or studless winter tires. The answer depends on where you live, where you drive, and local regulations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="bg-gray-100 rounded-xl p-6 border-2 border-gray-300">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">🔩</span>
                  <h3 className="text-2xl font-bold text-gray-900">Studded Winter Tires</h3>
                </div>

                <h4 className="font-bold text-gray-900 mb-2 mt-6">How They Work:</h4>
                <p className="text-gray-700 mb-4">
                  Small metal studs embedded in the tread physically bite into ice for maximum grip. Think of them like cleats for your car.
                </p>

                <h4 className="font-bold text-green-800 mb-2">Advantages:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Best ice traction:</strong> Nothing beats studded tires on glare ice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Confidence:</strong> Dramatically improved braking and acceleration on ice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Rural roads:</strong> Ideal for poorly maintained country roads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Packed snow:</strong> Excellent on hard-packed snow</span>
                  </li>
                </ul>

                <h4 className="font-bold text-red-800 mb-2">Disadvantages:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1">✗</span>
                    <span><strong>Noise:</strong> Loud clicking/humming on dry pavement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1">✗</span>
                    <span><strong>Road damage:</strong> Wear down pavement (why some areas ban them)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1">✗</span>
                    <span><strong>Dry performance:</strong> Slightly worse on dry pavement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1">✗</span>
                    <span><strong>Legal restrictions:</strong> Banned or restricted in many areas</span>
                  </li>
                </ul>

                <div className="bg-gray-200 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Best For:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Rural areas with frequent ice</li>
                    <li>• Northern regions</li>
                    <li>• Mountain/hill driving</li>
                    <li>• Drivers who prioritize ice grip above all</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">❄️</span>
                  <h3 className="text-2xl font-bold text-gray-900">Studless Winter Tires</h3>
                </div>

                <h4 className="font-bold text-gray-900 mb-2 mt-6">How They Work:</h4>
                <p className="text-gray-700 mb-4">
                  Advanced rubber compounds and thousands of tiny sipes (grooves) bite into ice and channel away water. Modern technology rivals studded performance.
                </p>

                <h4 className="font-bold text-green-800 mb-2">Advantages:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Legal everywhere:</strong> No restrictions in any province</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Quiet:</strong> Much quieter on dry/clear roads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Versatile:</strong> Better on dry pavement and wet roads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>Snow performance:</strong> Often better in deep, loose snow</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 mt-1">✓</span>
                    <span><strong>No studding cost:</strong> Ready to use as-is</span>
                  </li>
                </ul>

                <h4 className="font-bold text-orange-800 mb-2">Disadvantages:</h4>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-1">•</span>
                    <span><strong>Ice grip:</strong> Slightly less grip on pure ice than studded (but gap is narrowing with new tech)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-1">•</span>
                    <span><strong>Severe ice:</strong> May not match studded confidence in extreme ice conditions</span>
                  </li>
                </ul>

                <div className="bg-blue-100 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Best For:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Urban/suburban drivers</li>
                    <li>• Highway commuting</li>
                    <li>• Areas with plowed/salted roads</li>
                    <li>• Most Canadian drivers (95%+)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">⚠️ Studded Tire Restrictions in Canada</h4>
              <p className="text-gray-700 mb-4">
                Before choosing studded tires, check your local regulations. Restrictions vary by province:
              </p>

              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-red-800 mb-2">🚫 NOT ALLOWED:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>Ontario:</strong> Banned south of the French/Mattawa Rivers (most of populated Ontario)</li>
                    <li>• <strong>Quebec:</strong> Banned in southern regions including Montreal (May 1 - October 15 in allowed areas)</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-orange-800 mb-2">⏰ SEASONAL RESTRICTIONS:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>Alberta:</strong> October 1 - April 30 only</li>
                    <li>• <strong>Saskatchewan:</strong> October 1 - April 30 only</li>
                    <li>• <strong>BC:</strong> October 1 - April 30 only (September 1 on some highways)</li>
                    <li>• <strong>Manitoba, NB, NS, PEI, NL:</strong> Typically October 1 - May 31</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="font-bold text-green-800 mb-2">✓ ALLOWED YEAR-ROUND:</p>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>Northwest Territories</strong></li>
                    <li>• <strong>Yukon</strong></li>
                    <li>• <strong>Nunavut</strong></li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 mt-4 italic">
                Fines for violating studded tire regulations can be $100-500+. Always check current local bylaws before installing studded tires.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">Bottom Line Recommendation:</h4>
              <p className="text-gray-700 mb-4">
                For 95% of Canadian drivers, <strong>studless winter tires are the better choice</strong>. Modern studless tires like the Bridgestone Blizzak and Michelin X-Ice perform nearly as well as studded tires on ice, with none of the drawbacks.
              </p>
              <p className="text-gray-700">
                Choose studded tires only if you live in a rural area with frequent glare ice, drive on poorly maintained roads, or specifically need maximum ice grip and accept the trade-offs. If you're unsure, visit a <Link href="/services/winter-tires" className="text-blue-600 hover:text-blue-800 font-semibold">tire shop for expert advice</Link> based on your specific driving conditions.
              </p>
            </div>
          </section>

          {/* Section 5: Cost and Buying Guide */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Cost Breakdown: What You'll Really Pay
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Let's talk money. Winter tires are an investment in safety, but what does it actually cost? Here's a complete breakdown of all expenses involved in getting winter tires in Canada.
            </p>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-300 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Total Cost Calculator</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg p-6 text-center border-2 border-orange-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Budget Setup</h4>
                  <div className="text-4xl font-bold text-orange-600 mb-2">$440-670</div>
                  <p className="text-sm text-gray-600 mb-4">First-time total cost</p>
                  <ul className="text-left text-sm text-gray-700 space-y-2">
                    <li>• Tires: $320-520 (4 budget tires)</li>
                    <li>• Installation: $80-150</li>
                    <li>• Steel rims (optional): $300-600 extra</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 text-center border-2 border-green-400">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Mid-Range Setup</h4>
                  <div className="text-4xl font-bold text-green-600 mb-2">$580-920</div>
                  <p className="text-sm text-gray-600 mb-4">First-time total cost</p>
                  <ul className="text-left text-sm text-gray-700 space-y-2">
                    <li>• Tires: $400-720 (4 mid-range tires)</li>
                    <li>• Installation: $100-150</li>
                    <li>• Steel rims (optional): $350-650 extra</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-400">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Premium Setup</h4>
                  <div className="text-4xl font-bold text-blue-600 mb-2">$780-1,350</div>
                  <p className="text-sm text-gray-600 mb-4">First-time total cost</p>
                  <ul className="text-left text-sm text-gray-700 space-y-2">
                    <li>• Tires: $600-1,200 (4 premium tires)</li>
                    <li>• Installation: $120-150</li>
                    <li>• Alloy rims (optional): $400-800 extra</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-green-600">
                <p className="text-gray-700 mb-2">
                  <strong>Annual Costs After First Year:</strong>
                </p>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Changeover (with dedicated rims): $60-100 twice per year = $120-200/year</li>
                  <li>• Changeover (without rims): $80-150 twice per year = $160-300/year</li>
                  <li>• Optional storage: $80-150 per season</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Detailed Cost Breakdown</h3>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">1. Winter Tires (Set of 4)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-orange-800 mb-2">Budget Tier</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">$320-520</p>
                    <p className="text-sm text-gray-600">$80-130 per tire</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-green-800 mb-2">Mid-Range Tier</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">$400-720</p>
                    <p className="text-sm text-gray-600">$100-180 per tire</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-blue-800 mb-2">Premium Tier</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">$600-1,200</p>
                    <p className="text-sm text-gray-600">$150-300 per tire</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  Prices vary based on tire size. Larger vehicles (SUVs, trucks) pay more; compact cars pay less.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">2. Installation & Services</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <span className="text-gray-700">Mounting (4 tires on rims)</span>
                    <span className="font-bold text-gray-900">$60-100</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <span className="text-gray-700">Balancing (4 tires)</span>
                    <span className="font-bold text-gray-900">$40-80</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <span className="text-gray-700">Valve stems (4 new)</span>
                    <span className="font-bold text-gray-900">$20-40</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <span className="text-gray-700">TPMS service (if applicable)</span>
                    <span className="font-bold text-gray-900">$40-80</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <span className="text-gray-700">Disposal fee (old tires)</span>
                    <span className="font-bold text-gray-900">$15-30</span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-100 rounded-lg p-4 border-2 border-blue-400">
                    <span className="font-bold text-gray-900">Total Installation Package</span>
                    <span className="font-bold text-blue-800 text-xl">$80-150</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Many <Link href="/services/tire-installation" className="text-blue-600 hover:text-blue-800 font-semibold">tire shops</Link> offer package deals that include all installation services.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">3. Dedicated Winter Rims (Highly Recommended)</h4>
                <p className="text-gray-700 mb-4">
                  While optional, dedicated rims save money long-term and make seasonal changeovers much easier.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Steel Rims (Most Popular)</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">$300-600</p>
                    <p className="text-sm text-gray-600 mb-3">For set of 4</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Durable and rust-resistant</li>
                      <li>✓ Cheapest option</li>
                      <li>✓ Perfect for winter use</li>
                      <li>✓ Less attractive (winter only anyway)</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="font-bold text-gray-900 mb-2">Alloy Rims</p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">$400-800+</p>
                    <p className="text-sm text-gray-600 mb-3">For set of 4</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Lighter weight</li>
                      <li>✓ Better appearance</li>
                      <li>✓ Can rust in winter salt</li>
                      <li>✓ More expensive</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mt-4">
                  <p className="text-sm text-gray-700">
                    <strong>Why buy dedicated rims?</strong> Seasonal changeovers cost $60-100 each time. Without dedicated rims, mounting/unmounting tires twice yearly costs $160-300/year. Dedicated rims pay for themselves in 2-3 seasons, plus you can swap tires at home with a jack.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">4. Optional Services</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <div>
                      <span className="text-gray-900 font-semibold block">Seasonal Changeover</span>
                      <span className="text-sm text-gray-600">Twice per year</span>
                    </div>
                    <span className="font-bold text-gray-900">$60-100 each</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <div>
                      <span className="text-gray-900 font-semibold block">Tire Storage</span>
                      <span className="text-sm text-gray-600">Per season (6 months)</span>
                    </div>
                    <span className="font-bold text-gray-900">$80-150</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <div>
                      <span className="text-gray-900 font-semibold block">Wheel Alignment</span>
                      <span className="text-sm text-gray-600">Recommended annually</span>
                    </div>
                    <span className="font-bold text-gray-900">$80-150</span>
                  </div>
                  <div className="flex justify-between items-center bg-white rounded-lg p-4">
                    <div>
                      <span className="text-gray-900 font-semibold block">Road Hazard Warranty</span>
                      <span className="text-sm text-gray-600">Per tire, optional</span>
                    </div>
                    <span className="font-bold text-gray-900">$15-40 each</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-8">
              <h4 className="font-bold text-gray-900 mb-3">💰 Money-Saving Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li><strong>1. Buy early:</strong> Best selection and prices in September/early October before demand spikes</li>
                <li><strong>2. Package deals:</strong> Many tire shops offer package pricing (tires + rims + installation) at discounts</li>
                <li><strong>3. Compare prices:</strong> Call 3-4 <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shops near you</Link> for quotes—prices can vary $50-200 for the same tires</li>
                <li><strong>4. Black Friday/Boxing Day:</strong> Major tire retailers often have sales in late November and December</li>
                <li><strong>5. Skip studding:</strong> Studless tires perform nearly as well and don't require studding fees ($10-15 per tire)</li>
                <li><strong>6. DIY changeovers:</strong> With dedicated rims, you can swap tires yourself with a $50 jack and save $120-200/year</li>
                <li><strong>7. Insurance discount:</strong> Ask your insurance company about winter tire discounts (typically 5-10% off premiums)</li>
              </ul>
            </div>
          </section>

          {/* Section 6: Legal Requirements */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Legal Requirements by Province: Where Are Winter Tires Mandatory?
            </h2>

            <p className="text-gray-700 leading-relaxed mb-8">
              Winter tire laws vary significantly across Canada. Some provinces mandate them, others strongly recommend them, and insurance companies increasingly incentivize their use. Here's what you need to know for your province.
            </p>

            <div className="space-y-6">
              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-4">⚜️</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quebec - MANDATORY</h3>
                    <div className="bg-red-100 inline-block px-4 py-2 rounded-full text-sm font-bold text-red-800 mb-4">
                      LEGALLY REQUIRED
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <p className="text-gray-700 mb-4">
                    <strong className="text-red-800">Requirement:</strong> All passenger vehicles and taxis must have winter tires installed on all four wheels from <strong>December 1 to March 15</strong>.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Requirements:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• Must display three-peaked mountain/snowflake symbol OR M+S marking</li>
                        <li>• Minimum 3.5mm (4.8/32") tread depth</li>
                        <li>• All four tires must meet standards</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Penalties:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• <strong>$200-300 fine</strong> for non-compliance</li>
                        <li>• Police roadside checks are common</li>
                        <li>• Vehicle may be towed if unsafe</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    Quebec's law has been credited with reducing winter accidents by 3% and saving lives. Insurance companies may deny claims if you're not compliant.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-4">🏔️</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">British Columbia - REQUIRED ON HIGHWAYS</h3>
                    <div className="bg-blue-600 inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4">
                      HIGHWAY REQUIREMENT
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <p className="text-gray-700 mb-4">
                    <strong className="text-blue-800">Requirement:</strong> Winter tires required on <strong>most BC highways</strong> from <strong>October 1 to March 31</strong> (some routes require until April 30).
                  </p>
                  <div className="mb-4">
                    <p className="font-semibold text-gray-900 mb-2">Where Required:</p>
                    <ul className="space-y-1 text-gray-700 text-sm ml-4">
                      <li>• Sea-to-Sky Highway (Highway 99)</li>
                      <li>• Coquihalla Highway (Highway 5)</li>
                      <li>• Trans-Canada Highway (Highway 1) in mountain regions</li>
                      <li>• Most mountain highways and passes</li>
                      <li>• <strong>Look for signs:</strong> White tire symbol on blue background</li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Requirements:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• M+S (Mud and Snow) symbol minimum</li>
                        <li>• Three-peaked mountain/snowflake symbol recommended</li>
                        <li>• Minimum 3.5mm tread depth</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-2">Penalties:</p>
                      <ul className="space-y-1 text-gray-700 text-sm">
                        <li>• <strong>$121 fine</strong> for non-compliance</li>
                        <li>• May be turned back at checkpoints</li>
                        <li>• Not permitted to travel on highway</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    Even if you live in Vancouver and rarely drive to mountains, you must have winter tires if you plan ANY mountain highway travel. Don't risk it—fines and being stranded aren't worth it.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
                <div className="flex items-start mb-4">
                  <span className="text-4xl mr-4">🍁</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Rest of Canada - STRONGLY RECOMMENDED</h3>
                    <div className="bg-orange-500 inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4">
                      RECOMMENDED
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5">
                  <p className="text-gray-700 mb-4">
                    While not legally required in Ontario, Alberta, Saskatchewan, Manitoba, and Atlantic provinces, winter tires are <strong>strongly recommended</strong> and increasingly expected.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Why You Should Use Winter Tires Anyway:</h4>
                      <ul className="space-y-2 text-gray-700 ml-4">
                        <li>✓ <strong>Safety:</strong> 38% fewer accidents in winter conditions</li>
                        <li>✓ <strong>Insurance discounts:</strong> Most insurers offer 5-10% premium discounts</li>
                        <li>✓ <strong>Liability:</strong> Using all-seasons in winter could impact insurance claims</li>
                        <li>✓ <strong>Resale value:</strong> Buyers expect winter tires in used car sales</li>
                        <li>✓ <strong>Peace of mind:</strong> Confidence driving in Canadian winters</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Insurance Company Requirements:</h4>
                      <p className="text-gray-700 mb-2">
                        Many insurance companies now offer winter tire discounts, but some are making them semi-mandatory:
                      </p>
                      <ul className="space-y-1 text-gray-700 text-sm ml-4">
                        <li>• <strong>Desjardins:</strong> 5% discount with winter tires</li>
                        <li>• <strong>TD Insurance:</strong> Up to 10% discount</li>
                        <li>• <strong>Intact Insurance:</strong> 5% discount</li>
                        <li>• <strong>Aviva:</strong> 5% discount</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-3 italic">
                        Contact your insurance provider to confirm eligibility and requirements for winter tire discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 my-8">
              <h4 className="font-bold text-gray-900 mb-4 text-xl">Winter Tire Symbol Guide</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-5">
                  <div className="text-center mb-3">
                    <div className="text-5xl mb-2">🏔️</div>
                    <p className="font-bold text-gray-900">Three-Peaked Mountain/Snowflake</p>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>What it means:</strong> Tire meets specific snow traction performance requirements in standardized testing.
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Best for:</strong> True winter conditions. These are dedicated winter tires.
                  </p>
                  <p className="text-green-800 text-sm font-semibold">
                    ✓ Recommended for Canadian winters
                  </p>
                </div>

                <div className="bg-white rounded-lg p-5">
                  <div className="text-center mb-3">
                    <div className="text-5xl mb-2">M+S</div>
                    <p className="font-bold text-gray-900">M+S (Mud and Snow)</p>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>What it means:</strong> Tire has tread design suitable for mud and snow. Self-certified by manufacturer.
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Found on:</strong> All-season tires and winter tires.
                  </p>
                  <p className="text-orange-800 text-sm font-semibold">
                    ⚠️ Meets minimum BC requirements but not as good as snowflake symbol
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic text-center">
                Always look for the three-peaked mountain/snowflake symbol when buying winter tires. This guarantees true winter performance.
              </p>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="my-12">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Key Takeaways: Your Winter Tire Action Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="font-bold text-xl mb-2">When to Install</h3>
                  <p className="text-blue-100 text-sm">Install when temperatures consistently drop below 7°C. Book appointments 3-4 weeks in advance (September/early October) to avoid the rush.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">🛞</div>
                  <h3 className="font-bold text-xl mb-2">What to Buy</h3>
                  <p className="text-blue-100 text-sm">Mid-range tires (Goodyear, Nokian, Yokohama) offer best value for most drivers. Look for three-peaked mountain/snowflake symbol.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">💰</div>
                  <h3 className="font-bold text-xl mb-2">Budget</h3>
                  <p className="text-blue-100 text-sm">Expect $580-920 for mid-range setup (tires + installation). Add $300-600 for dedicated steel rims (highly recommended).</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">❄️</div>
                  <h3 className="font-bold text-xl mb-2">Studded vs Studless</h3>
                  <p className="text-blue-100 text-sm">95% of drivers should choose studless. They're quieter, legal everywhere, and perform nearly as well on ice with better all-around performance.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h3 className="font-bold text-xl mb-2">Legal Requirements</h3>
                  <p className="text-blue-100 text-sm">Mandatory in Quebec (Dec 1-Mar 15) and on BC mountain highways (Oct 1-Mar 31). Strongly recommended everywhere else in Canada.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="text-3xl mb-3">🏆</div>
                  <h3 className="font-bold text-xl mb-2">Top Brands</h3>
                  <p className="text-blue-100 text-sm">Bridgestone Blizzak (best ice grip), Michelin X-Ice (longest life), Goodyear UltraGrip (best value), General Altimax (best budget).</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Winter Tires for Your Vehicle?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't wait until the first snowfall when tire shops are overwhelmed. Find a tire shop near you and book your winter tire installation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Find Winter Tires Near Me
            </Link>
            <Link
              href="/services/winter-tires"
              className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-xl"
            >
              View Winter Tire Services
            </Link>
          </div>
          <p className="mt-8 text-blue-200 text-sm">
            Search over {siteConfig.totalShops} tire shops across Canada for the best prices on winter tires, installation, and seasonal changeover services.
          </p>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/blog/when-to-replace-tires"
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all block"
            >
              <div className="text-4xl mb-4">🛞</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                When Should You Replace Your Tires? 5 Warning Signs
              </h3>
              <p className="text-gray-600 mb-4">
                Learn the critical warning signs that indicate it's time to replace your tires for safety.
              </p>
              <span className="text-blue-600 font-semibold flex items-center">
                Read More <span className="ml-2">→</span>
              </span>
            </Link>

            <Link
              href="/services/tire-installation"
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all block"
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Tire Installation Services
              </h3>
              <p className="text-gray-600 mb-4">
                Find professional tire installation, mounting, and balancing services at tire shops near you.
              </p>
              <span className="text-blue-600 font-semibold flex items-center">
                Find Installation Services <span className="ml-2">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
