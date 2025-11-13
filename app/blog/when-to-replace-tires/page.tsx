import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'When Should You Replace Your Tires? 5 Warning Signs | TireShopPro.ca',
  description: 'Learn the 5 critical warning signs that indicate it\'s time to replace your tires. Expert advice on tire tread depth, age, damage, and when to visit a tire shop near you.',
  keywords: 'when to replace tires, tire replacement signs, tire tread depth, tire age limit, tire damage, worn tires, tire safety, tire shop near me',
  openGraph: {
    title: 'When Should You Replace Your Tires? 5 Warning Signs',
    description: 'Discover the 5 critical warning signs that indicate it\'s time to replace your tires. Stay safe on Canadian roads.',
    url: `${siteConfig.url}/blog/when-to-replace-tires`,
    siteName: siteConfig.name,
    type: 'article',
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'When to Replace Your Tires Guide',
      },
    ],
  },
};

export default function WhenToReplaceTiresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Tire Safety Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              When Should You Replace Your Tires? 5 Warning Signs
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
              Your tires are the only contact point between your vehicle and the road. Knowing when to replace them is critical for your safety and the safety of others.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">8 min read</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Updated 2025</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">Expert Advice</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Worn-out tires are one of the leading causes of vehicle accidents in Canada, particularly during harsh winter months. Yet many drivers wait too long to replace their tires, putting themselves and others at risk. The good news? Your tires give you clear warning signs when they need to be replaced.
          </p>

          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            In this comprehensive guide, we'll walk you through the 5 critical warning signs that indicate it's time to replace your tires, how to check your tire health at home, and when to visit a <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shop near you</Link> for a professional inspection.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-8">
            <p className="text-gray-800 font-semibold mb-2">Quick Answer:</p>
            <p className="text-gray-700">
              Replace your tires when tread depth reaches 2/32" (4/32" for winter tires), when they're 6+ years old, if you notice cracks/bulges, when tread is wearing unevenly, or if you experience poor traction even on dry roads. When in doubt, get a professional inspection.
            </p>
          </div>

          {/* Warning Sign 1 */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">1</span>
              Low Tread Depth: The Penny Test
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Tire tread depth is the most important indicator of tire health. Tread grooves channel water away from your tires, maintaining contact with the road. As tread wears down, your vehicle's ability to grip the road—especially in wet or snowy conditions—deteriorates dramatically.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Legal and Recommended Tread Depths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">All-Season & Summer Tires</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Legal minimum:</strong> 2/32" (1.6mm)</li>
                    <li><strong>Replace at:</strong> 4/32" (3mm) for safety</li>
                    <li><strong>New tire tread:</strong> 10/32" - 12/32"</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">Winter Tires</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Legal minimum:</strong> 2/32" (1.6mm)</li>
                    <li><strong>Replace at:</strong> 6/32" (4.8mm) for optimal winter performance</li>
                    <li><strong>New tire tread:</strong> 12/32" - 14/32"</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Check Tread Depth: The Penny Test</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You don't need special tools to check your tire tread depth. Here's how to perform the famous "penny test":
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
              <ol className="space-y-3 text-gray-700">
                <li><strong>1. Take a Canadian penny</strong> (any penny will work)</li>
                <li><strong>2. Insert the penny</strong> into your tire's tread groove with the Crown facing down</li>
                <li><strong>3. Check visibility:</strong>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>✓ If the top of the Crown is covered by tread, your tires are okay</li>
                    <li>✗ If you can see all of the Crown, your tread is below 2/32" - replace immediately</li>
                  </ul>
                </li>
                <li><strong>4. Repeat</strong> in multiple spots around each tire (check at least 3 locations per tire)</li>
              </ol>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              For a more accurate measurement, purchase a tread depth gauge from any <Link href="/services/tire-installation" className="text-blue-600 hover:text-blue-800 font-semibold">tire shop or auto parts store</Link> for $5-15. Professional tire shops use these during inspections.
            </p>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg my-6">
              <p className="text-gray-800">
                <strong className="text-red-800">Warning:</strong> Driving on tires with less than 2/32" tread depth is illegal in Canada and extremely dangerous. At this depth, your stopping distance increases by up to 50%, and hydroplaning risk skyrockets. Replace your tires immediately if they fail the penny test.
              </p>
            </div>
          </section>

          {/* Warning Sign 2 */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">2</span>
              Tire Age: The 6-Year Rule
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Many drivers are surprised to learn that tires have an expiration date—regardless of how much tread is left. Even if your tires look fine and have plenty of tread, the rubber compound degrades over time due to exposure to heat, sunlight, and ozone.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tire Age Guidelines</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-3xl mr-4">⏰</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">6 Years: Inspection Recommended</h4>
                    <p className="text-gray-700">Have your tires professionally inspected annually after 6 years of service, even if they look fine.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">🚫</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">10 Years: Maximum Lifespan</h4>
                    <p className="text-gray-700">Replace all tires that are 10 years old or older, regardless of condition or tread depth. No exceptions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-3xl mr-4">📦</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">New Tires Count Too</h4>
                    <p className="text-gray-700">Age is calculated from the manufacturing date, not purchase date. Check the tire sidewall for the DOT code.</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Find Your Tire's Age</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every tire has a DOT (Department of Transportation) number molded into the sidewall. The last four digits tell you when the tire was manufactured:
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
              <p className="text-gray-800 mb-3"><strong>Example:</strong> DOT code ending in "2318"</p>
              <ul className="space-y-2 text-gray-700">
                <li><strong>"23"</strong> = Week 23 of the year (June)</li>
                <li><strong>"18"</strong> = Year 2018</li>
                <li><strong>Result:</strong> This tire was manufactured in June 2018, making it over 6 years old in 2025</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The DOT code is usually located on the inner sidewall of the tire (facing the vehicle). You may need to get down on your knees with a flashlight to read it. If you have trouble finding it, any <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">tire shop</Link> can quickly check this for you during a free inspection.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800">
                <strong className="text-orange-800">Pro Tip:</strong> When buying new tires, always check the manufacturing date. Some tire shops sell tires that have been sitting in storage for 2-3 years. Ideally, purchase tires manufactured within the last 12 months for maximum lifespan.
              </p>
            </div>
          </section>

          {/* Warning Sign 3 */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">3</span>
              Cracks, Bulges, and Visible Damage
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              While tread depth and age are gradual concerns, visible damage to your tires demands immediate attention. These issues can lead to sudden tire failure—including blowouts at highway speeds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">⚠️</span>
                  Sidewall Bulges
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>What it looks like:</strong> A bubble or bulge protruding from the tire's sidewall
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>What causes it:</strong> Impact damage (potholes, curbs) that breaks the tire's internal structure
                </p>
                <p className="text-red-800 font-semibold">
                  Action: Replace immediately. Do not drive on bulging tires—they can blow out without warning.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔍</span>
                  Sidewall Cracks
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>What it looks like:</strong> Small cuts or cracks in the rubber, usually on the sidewall
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>What causes it:</strong> Age, UV exposure, underinflation, or chemical damage
                </p>
                <p className="text-red-800 font-semibold">
                  Action: Minor surface cracks may be okay, but deep cracks require immediate replacement. Get professional evaluation.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  Tread Separation
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>What it looks like:</strong> Tread rubber lifting away from the tire body
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>What causes it:</strong> Manufacturing defects, overheating, or age-related failure
                </p>
                <p className="text-red-800 font-semibold">
                  Action: Replace immediately. Tread separation is a serious safety hazard that can cause loss of vehicle control.
                </p>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔴</span>
                  Exposed Cords or Belt
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>What it looks like:</strong> Metal wires or fabric visible through the rubber
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>What causes it:</strong> Excessive wear, road debris punctures, or severe underinflation
                </p>
                <p className="text-red-800 font-semibold">
                  Action: Stop driving immediately. Exposed cords indicate critical tire failure. Have vehicle towed if necessary.
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 my-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Visual Inspection Checklist</h3>
              <p className="text-gray-700 mb-4">Perform this 2-minute inspection once a month:</p>
              <div className="space-y-2 text-gray-700">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Walk around vehicle and visually inspect all four tires</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Check for cuts, punctures, or objects embedded in tread</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Look for bulges, bubbles, or deformities on sidewalls</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Inspect for cracks in the rubber (especially sidewalls)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Check tire pressure with gauge (including spare tire)</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span>Verify valve caps are in place on all tires</span>
                </label>
              </div>
            </div>
          </section>

          {/* Warning Sign 4 */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">4</span>
              Uneven Tread Wear Patterns
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Tires should wear evenly across the entire tread surface. Uneven wear not only shortens tire life but also indicates potential problems with your vehicle's alignment, suspension, or tire inflation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Center Wear</h3>
                <div className="bg-orange-200 h-4 rounded-full mb-3 relative">
                  <div className="absolute inset-y-0 left-1/4 right-1/4 bg-orange-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Tread in the middle wears faster than edges</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Overinflation (too much air pressure)</p>
                <p className="text-blue-800 font-semibold">Solution: Check and adjust tire pressure, replace if wear is severe</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Edge Wear (Both Sides)</h3>
                <div className="bg-orange-200 h-4 rounded-full mb-3 relative">
                  <div className="absolute inset-y-0 left-0 w-1/4 bg-orange-500 rounded-l-full"></div>
                  <div className="absolute inset-y-0 right-0 w-1/4 bg-orange-500 rounded-r-full"></div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Both outer edges wear faster than center</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Underinflation (not enough air pressure)</p>
                <p className="text-blue-800 font-semibold">Solution: Check for leaks, maintain proper pressure, replace if severe</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">One-Side Wear</h3>
                <div className="bg-orange-200 h-4 rounded-full mb-3 relative">
                  <div className="absolute inset-y-0 right-0 w-1/3 bg-orange-500 rounded-r-full"></div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Inside or outside edge wears much faster</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Misalignment (camber or toe issues)</p>
                <p className="text-blue-800 font-semibold">Solution: Get wheel alignment, then replace tires</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cupping/Scalloping</h3>
                <div className="flex gap-1 mb-3">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`flex-1 bg-orange-${i % 2 === 0 ? '500' : '200'} h-4 rounded-sm`}></div>
                  ))}
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Scalloped dips around the edge of tread</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Worn suspension components or unbalanced tires</p>
                <p className="text-blue-800 font-semibold">Solution: Inspect suspension, balance/rotate tires, replace if noisy</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Feathering</h3>
                <div className="flex gap-1 mb-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex-1 bg-orange-400 transform -skew-x-12" style={{height: `${12 + (i % 3) * 4}px`}}></div>
                  ))}
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Tread ribs worn smooth on one side, sharp on other</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Alignment issues (usually toe misalignment)</p>
                <p className="text-blue-800 font-semibold">Solution: Get alignment immediately to prevent rapid wear</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flat Spots</h3>
                <div className="bg-orange-200 h-4 rounded-full mb-3 relative">
                  <div className="absolute inset-y-0 left-1/3 right-1/3 bg-orange-500"></div>
                </div>
                <p className="text-gray-700 mb-2"><strong>Pattern:</strong> Worn flat area on one section of tire</p>
                <p className="text-gray-700 mb-2"><strong>Cause:</strong> Hard braking, lockup, or long-term parking</p>
                <p className="text-blue-800 font-semibold">Solution: Replace tire if severe, check ABS system</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg my-6">
              <h4 className="font-bold text-gray-900 mb-3">Important: Fix the Root Cause</h4>
              <p className="text-gray-700">
                Simply replacing tires with uneven wear won't solve the problem—your new tires will wear out prematurely too. Always address the underlying issue (alignment, suspension, tire pressure) before or during tire replacement. Most <Link href="/services/wheel-alignment" className="text-blue-600 hover:text-blue-800 font-semibold">tire shops offer wheel alignment services</Link> and can inspect your suspension components.
              </p>
            </div>
          </section>

          {/* Warning Sign 5 */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">5</span>
              Poor Performance and Traction Issues
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Sometimes your tires tell you they need replacement through how your vehicle handles. If you notice any of these performance issues, your tires may be worn beyond safe limits even if they pass visual inspections.
            </p>

            <div className="space-y-6 my-8">
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🌧️ Hydroplaning in Rain</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Your tires lose contact with wet roads, causing the vehicle to "float" or slide
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> Worn tread can't channel water away fast enough. This is extremely dangerous and indicates immediate replacement is needed.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🛑 Longer Stopping Distances</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Your vehicle takes longer to stop than usual, especially in wet conditions
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> Worn tread reduces contact patch and friction. Tests show stopping distance can increase by 50% or more with worn tires.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💨 Loss of Traction</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Wheels spin more easily during acceleration, especially on hills or when turning
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> Insufficient tread can't bite into road surface. Particularly noticeable in winter or rain.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📳 Increased Vibration</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Unusual vibration through steering wheel or seat, especially at highway speeds
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> Uneven wear, internal damage, or separation. Could also indicate balance/alignment issues. Get inspected immediately.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🔊 Unusual Road Noise</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Loud humming, thumping, or roaring noise that wasn't present before
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> Uneven wear patterns (especially cupping) or tire damage. The noise often gets louder as wear progresses.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Vehicle Pulling</h3>
                <p className="text-gray-700 mb-2">
                  <strong>What it means:</strong> Vehicle consistently pulls to one side when driving straight
                </p>
                <p className="text-gray-700">
                  <strong>Why it happens:</strong> While often alignment-related, severe uneven tire wear can cause pulling. One tire may have significantly less tread than others.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-6">
              <p className="text-gray-800">
                <strong className="text-yellow-800">Note:</strong> Performance issues can also indicate problems beyond your tires—such as alignment, suspension, or brake issues. If you're experiencing any of these symptoms, visit a <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">professional tire shop</Link> for a comprehensive inspection. They can diagnose whether the issue is tire-related or something else.
              </p>
            </div>
          </section>

          {/* Additional Tire Replacement Factors */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Other Factors to Consider
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Canadian Winter Considerations</h3>
                <p className="text-gray-700 mb-4">
                  In Canada, <Link href="/services/winter-tires" className="text-blue-600 hover:text-blue-800 font-semibold">winter tires</Link> should be replaced when tread depth reaches 6/32" (4.8mm), not the legal minimum of 2/32". This is because winter tire performance drops significantly below 6/32", compromising your safety in snow and ice. Don't wait for the legal minimum—the extra tread depth could save your life.
                </p>
                <p className="text-gray-700">
                  Many insurance companies in Canada offer discounts (typically 5-10%) when you use winter tires. Keep receipts from your tire shop to claim this discount.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Should You Replace All Four Tires?</h3>
                <p className="text-gray-700 mb-4">
                  <strong>Ideally, yes.</strong> Replacing all four tires ensures uniform handling and traction. However, if only one or two tires are damaged and the others have sufficient tread:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li><strong>AWD/4WD vehicles:</strong> Must replace all four tires to avoid drivetrain damage. Tread depth difference should not exceed 2/32"</li>
                  <li><strong>Front-wheel drive:</strong> Replace both front tires together. Place new tires on rear axle for better stability</li>
                  <li><strong>Rear-wheel drive:</strong> Replace both rear tires together. Can place new tires on rear axle</li>
                  <li><strong>Single tire:</strong> Only if others have 70% or more tread life remaining and you can match the brand/model exactly</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tire Repair vs. Replacement</h3>
                <p className="text-gray-700 mb-3">
                  Not every tire issue requires replacement. Small punctures can often be repaired by a professional tire shop:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-green-800 mb-2">✓ Repairable:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Puncture in tread area</li>
                      <li>• Puncture less than 1/4" diameter</li>
                      <li>• Tire has sufficient remaining tread</li>
                      <li>• No previous repairs in same area</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-2">✗ Must Replace:</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Sidewall damage of any kind</li>
                      <li>• Puncture larger than 1/4"</li>
                      <li>• Multiple punctures</li>
                      <li>• Run-flat tire that was driven flat</li>
                      <li>• Tire with bulges or separation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cost of Tire Replacement in Canada</h3>
                <p className="text-gray-700 mb-4">
                  Tire replacement costs vary widely based on vehicle type, tire quality, and location:
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Budget Tires: $80-130 per tire</h4>
                    <p className="text-gray-600 text-sm">Good for older vehicles or low-mileage drivers</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Mid-Range Tires: $100-200 per tire</h4>
                    <p className="text-gray-600 text-sm">Best value for most drivers, good performance and longevity</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">Premium Tires: $150-400+ per tire</h4>
                    <p className="text-gray-600 text-sm">Luxury vehicles, high-performance cars, or specialized needs</p>
                  </div>
                </div>
                <p className="text-gray-700 mt-4 text-sm">
                  Add $15-45 per tire for installation (mounting, balancing, valve stems, disposal). Wheel alignment costs an additional $80-150 if needed.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="my-12">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Key Takeaways</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">📏</div>
                  <h3 className="font-bold mb-2">Check Tread Monthly</h3>
                  <p className="text-blue-100 text-sm">Use the penny test. Replace at 4/32" for all-seasons, 6/32" for winter tires</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">⏰</div>
                  <h3 className="font-bold mb-2">Age Matters</h3>
                  <p className="text-blue-100 text-sm">Inspect tires after 6 years, replace by 10 years regardless of tread</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">👀</div>
                  <h3 className="font-bold mb-2">Visual Inspection</h3>
                  <p className="text-blue-100 text-sm">Check monthly for cracks, bulges, punctures, or other damage</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">⚖️</div>
                  <h3 className="font-bold mb-2">Even Wear</h3>
                  <p className="text-blue-100 text-sm">Uneven wear indicates alignment, pressure, or suspension issues</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🚗</div>
                  <h3 className="font-bold mb-2">Performance</h3>
                  <p className="text-blue-100 text-sm">Hydroplaning, long stopping, or vibration means it's time to replace</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🛠️</div>
                  <h3 className="font-bold mb-2">Professional Help</h3>
                  <p className="text-blue-100 text-sm">Get annual inspections and address issues promptly at a tire shop</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What is the legal minimum tire tread depth in Canada?
                </h3>
                <p className="text-gray-700">
                  The legal minimum tire tread depth in Canada is 2/32" (1.6mm) for all tires. However, safety experts and tire manufacturers recommend replacing all-season tires at 4/32" and winter tires at 6/32" for optimal performance. Driving with less than 2/32" tread is illegal and extremely dangerous, especially in wet or winter conditions.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How can I tell if my tires are too old?
                </h3>
                <p className="text-gray-700">
                  Check the DOT code on your tire's sidewall. The last four digits indicate the manufacturing date (week and year). For example, "2318" means week 23 of 2018. Replace tires that are 10 years old or older regardless of condition. Get annual inspections after 6 years. Even tires with good tread should be replaced when they reach 10 years old, as the rubber degrades over time.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Do I need to replace all four tires at once?
                </h3>
                <p className="text-gray-700">
                  For AWD/4WD vehicles, you should replace all four tires to prevent drivetrain damage. For FWD and RWD vehicles, it's best to replace tires in pairs (both fronts or both rears) at minimum. If replacing only two tires, always put the new tires on the rear axle for better stability and reduced oversteer risk. If other tires have 70%+ tread remaining, you may be able to replace just one tire—but only if you can match the exact brand and model.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Can a tire shop repair my tire instead of replacing it?
                </h3>
                <p className="text-gray-700">
                  Yes, many tire punctures can be repaired. A tire shop can repair punctures in the tread area that are less than 1/4" (6mm) in diameter, as long as the tire has sufficient remaining tread and hasn't been driven flat. However, sidewall damage, large punctures, multiple punctures, or tires with bulges/separation must be replaced. Professional tire repair typically costs $20-30. Visit a tire shop for a free inspection to determine if repair is possible.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How much does it cost to replace tires in Canada?
                </h3>
                <p className="text-gray-700">
                  Tire replacement costs vary based on vehicle type and tire quality. Budget tires cost $80-130 per tire, mid-range tires $100-200, and premium tires $150-400+. For a set of four mid-range tires with installation, expect to pay $500-1000 total. Installation includes mounting, balancing, valve stems, and old tire disposal ($15-45 per tire). Additional services like wheel alignment ($80-150) may be recommended. Shop around at multiple tire shops for the best deal.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  When should I replace my winter tires?
                </h3>
                <p className="text-gray-700">
                  Replace winter tires when tread depth reaches 6/32" (4.8mm) rather than the legal minimum of 2/32". Winter tire performance degrades significantly below 6/32", compromising traction on snow and ice. Also replace winter tires if they're 6-10 years old, show cracks or damage, or if you notice reduced grip in winter conditions. In Canada, using proper winter tires is essential for safety and may qualify you for insurance discounts.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What causes uneven tire wear?
                </h3>
                <p className="text-gray-700">
                  Uneven tire wear is typically caused by incorrect tire pressure, misalignment, or worn suspension components. Center wear indicates overinflation, edge wear suggests underinflation, one-sided wear points to alignment issues, and cupping/scalloping indicates worn suspension or unbalanced tires. When you notice uneven wear, visit a tire shop to diagnose the root cause. Simply replacing tires without fixing the underlying problem will cause your new tires to wear out prematurely.
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Is a tire bulge dangerous?
                </h3>
                <p className="text-gray-700">
                  Yes, a tire bulge is extremely dangerous and requires immediate tire replacement. Bulges are caused by impact damage (hitting potholes or curbs) that breaks the tire's internal structure. The bulge is an area where the tire's strength is compromised, and it can blow out suddenly—especially at highway speeds or in hot weather. Do not drive on tires with bulges. Have your vehicle towed to a tire shop if necessary. This is a safety emergency.
                </p>
              </div>
            </div>
          </section>

          {/* Tire Safety Tips */}
          <section className="my-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Tire Safety and Maintenance Tips
            </h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Regular Maintenance</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Check tire pressure monthly (including spare) when tires are cold</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Rotate tires every 8,000-10,000 km for even wear</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Get wheel alignment annually or if you notice pulling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Balance tires when installing new tires or if you feel vibration</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Perform visual inspections monthly for damage or wear</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Extend Tire Life</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Avoid hard acceleration and aggressive cornering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Don't overload your vehicle beyond its weight rating</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Avoid potholes, curbs, and road debris when possible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Store off-season tires properly (cool, dry, away from sunlight)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">✓</span>
                      <span>Keep tires clean and away from chemicals/petroleum products</span>
                    </li>
                  </ul>
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
            Need New Tires? Find a Tire Shop Near You
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't wait until it's too late. If your tires show any of these warning signs, it's time to visit a professional tire shop for an inspection or replacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Find Tire Shops Near Me
            </Link>
            <Link
              href="/services/tire-installation"
              className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-xl"
            >
              Learn About Tire Installation
            </Link>
          </div>
          <p className="mt-8 text-blue-200 text-sm">
            Search over {siteConfig.totalShops} tire shops across Canada for the best prices on tire replacement, installation, and alignment services.
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
              href="/blog/winter-tire-guide-canada"
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all block"
            >
              <div className="text-4xl mb-4">❄️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ultimate Winter Tire Guide for Canadian Drivers
              </h3>
              <p className="text-gray-600 mb-4">
                Everything you need to know about choosing, installing, and maintaining winter tires in Canada.
              </p>
              <span className="text-blue-600 font-semibold flex items-center">
                Read More <span className="ml-2">→</span>
              </span>
            </Link>

            <Link
              href="/services/winter-tires"
              className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all block"
            >
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Winter Tire Services in Canada
              </h3>
              <p className="text-gray-600 mb-4">
                Find winter tire sales, installation, changeover, and storage services at tire shops near you.
              </p>
              <span className="text-blue-600 font-semibold flex items-center">
                Find Winter Tires <span className="ml-2">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
