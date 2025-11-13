import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tire Tips & Maintenance Blog | TireShopPro.ca',
  description: 'Expert tire maintenance tips, seasonal guides, and automotive advice. Learn how to maintain your tires, when to replace them, and save money.',
  keywords: 'tire tips, tire maintenance, tire care, tire advice, winter tire tips, tire safety',
};

const blogPosts = [
  {
    slug: 'when-to-replace-tires',
    title: 'When Should You Replace Your Tires? 5 Warning Signs',
    excerpt: 'Learn the key indicators that it\'s time for new tires, from tread depth to age limits. Don\'t wait until it\'s too late.',
    date: '2025-01-15',
    category: 'Maintenance',
    readTime: '5 min read',
    image: '🛞'
  },
  {
    slug: 'tire-pressure-guide',
    title: 'Complete Guide to Tire Pressure: Why It Matters',
    excerpt: 'Proper tire pressure saves fuel, extends tire life, and keeps you safe. Learn how to check and maintain optimal pressure.',
    date: '2025-01-10',
    category: 'Maintenance',
    readTime: '6 min read',
    image: '💨'
  },
  {
    slug: 'winter-tire-guide-canada',
    title: 'Ultimate Winter Tire Guide for Canadian Drivers',
    excerpt: 'Everything you need to know about winter tires in Canada: when to install, which brands to buy, and provincial laws.',
    date: '2025-01-05',
    category: 'Seasonal',
    readTime: '8 min read',
    image: '❄️'
  },
  {
    slug: 'how-often-rotate-tires',
    title: 'How Often Should You Rotate Your Tires?',
    excerpt: 'Tire rotation extends tire life by 15-20%. Learn the right rotation schedule and patterns for your vehicle.',
    date: '2024-12-20',
    category: 'Maintenance',
    readTime: '4 min read',
    image: '🔄'
  },
  {
    slug: 'tire-buying-guide',
    title: 'How to Buy Tires: Complete Buyer\'s Guide 2025',
    excerpt: 'Navigate tire sizes, types, brands, and prices. Get the best tires for your vehicle and budget.',
    date: '2024-12-15',
    category: 'Buying Guide',
    readTime: '10 min read',
    image: '🛒'
  },
  {
    slug: 'extend-tire-life',
    title: '7 Simple Ways to Make Your Tires Last Longer',
    excerpt: 'Save money and get maximum mileage from your tires with these proven maintenance tips.',
    date: '2024-12-10',
    category: 'Tips',
    readTime: '5 min read',
    image: '💰'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tire Tips & Maintenance Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Expert advice on tire maintenance, safety, and everything you need to know to keep your vehicle running smoothly
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in stagger-${index + 1}`}
              >
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{post.image}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-blue-600 font-semibold">Read More →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Professional Tire Service?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find tire shops near you for installation, maintenance, and repairs
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Find Tire Shops Near Me
          </Link>
        </div>
      </section>
    </div>
  );
}
