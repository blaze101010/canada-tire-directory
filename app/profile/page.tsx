'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userMetadata = user.user_metadata || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl text-blue-600 font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {userMetadata.full_name || user.email?.split('@')[0]}
                </h2>
                <p className="text-blue-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>

                {userMetadata.full_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="text-gray-900">{userMetadata.full_name}</p>
                  </div>
                )}

                {userMetadata.business_name && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name
                    </label>
                    <p className="text-gray-900">{userMetadata.business_name}</p>
                  </div>
                )}

                {userMetadata.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <p className="text-gray-900">{userMetadata.phone}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Created
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/my-shops"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-semibold text-gray-900">My Shops</p>
                    <p className="text-sm text-gray-600">View your submissions</p>
                  </div>
                </Link>

                <Link
                  href="/add-shop"
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl">➕</span>
                  <div>
                    <p className="font-semibold text-gray-900">Add a Shop</p>
                    <p className="text-sm text-gray-600">Submit a new listing</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Coming Soon Features */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Edit profile information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Change password</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Email preferences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Two-factor authentication</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
