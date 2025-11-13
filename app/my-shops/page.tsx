'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  website: string | null;
  description: string | null;
  services: string[];
  owner_name: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  rejection_reason: string | null;
}

export default function MyShopsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchSubmissions() {
      if (!user) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('user_submissions')
          .select('*')
          .eq('user_id', user.id)
          .order('submitted_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching submissions:', fetchError);
          setError('Failed to load your submissions');
          return;
        }

        setSubmissions(data || []);
      } catch (err) {
        console.error('Error:', err);
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your shops...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            ⏳ Pending Review
          </span>
        );
      case 'approved':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✓ Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
            ✗ Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Shops</h1>
          <p className="text-gray-600">View and manage your tire shop submissions</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <span className="text-6xl mb-4 block">🏪</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Shops Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't submitted any tire shops yet. Get started by adding your shop to our directory.
            </p>
            <Link
              href="/add-shop"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Add Your First Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'}
              </p>
              <Link
                href="/add-shop"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Add Another Shop
              </Link>
            </div>

            <div className="space-y-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {submission.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Submitted on {new Date(submission.submitted_at).toLocaleDateString('en-CA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      {getStatusBadge(submission.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-900">
                          {submission.street}<br />
                          {submission.city}, {submission.province} {submission.postal_code}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Contact</p>
                        <p className="text-gray-900">{submission.email}</p>
                        <p className="text-gray-900">{submission.phone}</p>
                      </div>
                    </div>

                    {submission.services && submission.services.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Services Offered</p>
                        <div className="flex flex-wrap gap-2">
                          {submission.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {submission.description && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="text-gray-700">{submission.description}</p>
                      </div>
                    )}

                    {submission.status === 'rejected' && submission.rejection_reason && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-semibold text-red-900 mb-1">Rejection Reason</p>
                        <p className="text-red-800">{submission.rejection_reason}</p>
                      </div>
                    )}

                    {submission.status === 'approved' && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800">
                          🎉 Your shop is now live on TireShopPro! Customers can find and contact your business.
                        </p>
                      </div>
                    )}

                    {submission.status === 'pending' && (
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800">
                          ⏳ Your submission is under review. We'll notify you once it's processed (usually within 2-3 business days).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
