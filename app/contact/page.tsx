import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | TireShopPro.ca - Get in Touch',
  description: 'Contact TireShopPro.ca for tire shop listings, technical support, or partnership opportunities. We\'re here to help Canadian drivers find the best tire services.',
  keywords: 'contact tire shop directory, add tire shop listing, tire shop support, tire shop partnership',
  openGraph: {
    title: 'Contact Us | TireShopPro.ca',
    description: 'Get in touch with TireShopPro.ca for tire shop listings, support, or partnership opportunities.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have a question, suggestion, or want to add your tire shop? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Contact Information - Takes up 1 column */}
            <div className="lg:col-span-1">
              {/* Contact Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start">
                    <span className="text-3xl mr-4">📧</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a href="mailto:info@tireshoppro.ca" className="text-blue-600 hover:text-blue-800">
                        info@tireshoppro.ca
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start">
                    <span className="text-3xl mr-4">⏱️</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
                      <p className="text-gray-700">Within 24-48 hours</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start">
                    <span className="text-3xl mr-4">📍</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Serving</h3>
                      <p className="text-gray-700">All of Canada</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      <span className="mr-2">🏠</span> Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      <span className="mr-2">📝</span> Blog & Tire Tips
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      <span className="mr-2">🔧</span> All Services
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How do I add my tire shop to the directory?
              </h3>
              <p className="text-gray-700">
                Simply fill out the contact form above and select "Add My Tire Shop" as the subject.
                Provide your shop's details in the message, and we'll get your listing set up within
                2-3 business days. Listing is free for all Canadian tire shops.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How do I update my shop's information?
              </h3>
              <p className="text-gray-700">
                Use the contact form and select "Update Listing Information" as the subject.
                Include your shop name and the information you'd like to update. We'll process
                the changes within 24-48 hours.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is the directory free to use?
              </h3>
              <p className="text-gray-700">
                Yes! TireShopPro.ca is completely free for both customers searching for tire
                shops and for tire shops to be listed. Our mission is to help Canadian drivers
                find quality tire services in their area.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do you cover all of Canada?
              </h3>
              <p className="text-gray-700">
                Absolutely! We have tire shop listings across all Canadian provinces and
                territories, from British Columbia to Newfoundland, and from Ontario to the Yukon.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                How can I report incorrect information?
              </h3>
              <p className="text-gray-700">
                If you notice any incorrect information in a listing, please use the contact
                form and select "Update Listing Information" or "Feedback or Suggestions".
                Include the shop name and the incorrect details, and we'll investigate and
                correct it promptly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Looking for Tire Shops Near You?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Search our directory of 6,700+ tire shops across Canada
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Find Tire Shops
          </Link>
        </div>
      </section>
    </div>
  );
}
