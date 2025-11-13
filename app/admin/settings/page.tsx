'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Settings state
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [googlePlacesApiKey, setGooglePlacesApiKey] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');

      const data = await response.json();
      setSiteName(data.site_name || 'TireShopPro.ca');
      setSiteUrl(data.site_url || 'https://tireshoppro.ca');
      setContactEmail(data.contact_email || '');
      setGooglePlacesApiKey(data.google_places_api_key || '');
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site_name: siteName,
          site_url: siteUrl,
          contact_email: contactEmail,
          google_places_api_key: googlePlacesApiKey,
        }),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  }

  async function handleClearReviews() {
    if (!confirm('Are you sure you want to delete ALL reviews? This action cannot be undone!')) {
      return;
    }

    if (!confirm('This will permanently delete all reviews and reset all shop ratings. Are you absolutely sure?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/clear-reviews', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to clear reviews');

      const data = await response.json();
      setMessage({ type: 'success', text: data.message });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Error clearing reviews:', error);
      setMessage({ type: 'error', text: 'Failed to clear reviews' });
    }
  }

  async function handleResetHours() {
    if (!confirm('Are you sure you want to reset ALL working hours? This action cannot be undone!')) {
      return;
    }

    if (!confirm('This will permanently delete all working hours data from all shops. Are you absolutely sure?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/reset-hours', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to reset hours');

      const data = await response.json();
      setMessage({ type: 'success', text: data.message });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Error resetting hours:', error);
      setMessage({ type: 'error', text: 'Failed to reset hours' });
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your admin panel and site settings</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-lg border-2 ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Site Information Form */}
        <form onSubmit={handleSaveSettings}>
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Site Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="TireShopPro.ca"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site URL
                </label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://tireshoppro.ca"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="admin@tireshoppro.ca"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

        {/* Database Info */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Database Connection</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Status</span>
              <span className="inline-flex items-center gap-2 text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Provider</span>
              <span className="text-gray-900 font-medium">Supabase</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-700">Region</span>
              <span className="text-gray-900 font-medium">US East</span>
            </div>
          </div>
        </div>

        {/* Admin Tools */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/docs/CSV_IMPORT_GUIDE.md"
              target="_blank"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">📄</span>
              <div>
                <p className="font-semibold text-gray-900">CSV Import Guide</p>
                <p className="text-sm text-gray-600">Documentation</p>
              </div>
            </a>

            <a
              href="/docs/WORKING_HOURS_UPDATE.md"
              target="_blank"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-semibold text-gray-900">Working Hours Guide</p>
                <p className="text-sm text-gray-600">Documentation</p>
              </div>
            </a>

            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">🗄️</span>
              <div>
                <p className="font-semibold text-gray-900">Database Console</p>
                <p className="text-sm text-gray-600">Supabase Dashboard</p>
              </div>
            </a>

            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <span className="text-2xl">🌐</span>
              <div>
                <p className="font-semibold text-gray-900">View Public Site</p>
                <p className="text-sm text-gray-600">Open in new tab</p>
              </div>
            </a>
          </div>
        </div>

          {/* API Configuration */}
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">API Configuration</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Places API Key
                </label>
                <input
                  type="password"
                  value={googlePlacesApiKey}
                  onChange={(e) => setGooglePlacesApiKey(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: Used for automated working hours updates
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-lg shadow-md p-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-900 mb-4">Danger Zone</h2>
          <p className="text-sm text-red-700 mb-4">
            Warning: These actions are irreversible. Use with extreme caution.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-red-200">
              <div>
                <p className="font-semibold text-red-900">Clear All Reviews</p>
                <p className="text-sm text-red-700">Permanently delete all reviews and reset shop ratings</p>
              </div>
              <button
                onClick={handleClearReviews}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear Reviews
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold text-red-900">Reset Working Hours</p>
                <p className="text-sm text-red-700">Permanently delete all working hours data from all shops</p>
              </div>
              <button
                onClick={handleResetHours}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Reset Hours
              </button>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Admin Dashboard v1.0.0 | Built with Next.js 16 & Supabase
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
