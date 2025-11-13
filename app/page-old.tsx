'use client';

import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import ShopCard from '@/components/ShopCard';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [shops, setShops] = useState<TireShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tire shops from Supabase
  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        setShops(data || []);
      } catch (err) {
        console.error('Error fetching tire shops:', err);
        setError('Failed to load tire shops. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  const filteredShops = useMemo(() => {
    return shops.filter((shop) => {
      const matchesSearch =
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.full_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.postal_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;

      const matchesProvince = !selectedProvince || shop.state === selectedProvince;

      return matchesSearch && matchesProvince;
    });
  }, [shops, searchTerm, selectedProvince]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-10 text-center">
          <h1 className="text-5xl font-bold mb-3">Canadian Tire Shop Directory</h1>
          <p className="text-xl opacity-90">Find tire shops across Canada</p>
        </header>

        {/* Search Section */}
        <div className="p-8 bg-gray-50 border-b-2 border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by shop name, city, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-indigo-600 transition-colors"
            />

            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="px-5 py-3 border-2 border-gray-300 rounded-lg text-base bg-white cursor-pointer focus:outline-none focus:border-indigo-600 transition-colors md:min-w-[200px]"
            >
              <option value="">All Provinces</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        {!loading && !error && (
          <div className="px-8 py-5 bg-blue-50 text-blue-800 font-semibold">
            Showing {filteredShops.length} shop{filteredShops.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 px-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading tire shops...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20 px-8">
            <h2 className="text-3xl font-bold text-red-600 mb-3">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Shops Grid */}
        {!loading && !error && (
          <>
            {filteredShops.length === 0 ? (
              <div className="text-center py-20 px-8">
                <h2 className="text-3xl font-bold text-gray-700 mb-3">No shops found</h2>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="bg-blue-700 text-white text-center py-5">
          <p className="text-sm">
            Canadian Tire Shop Directory &copy; 2025 | Find reliable tire services nationwide
          </p>
        </footer>
      </div>
    </div>
  );
}
