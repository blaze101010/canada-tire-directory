'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import Link from 'next/link';

export default function ShopsManagement() {
  const [shops, setShops] = useState<TireShop[]>([]);
  const [filteredShops, setFilteredShops] = useState<TireShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 50;

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    let filtered = shops;

    if (searchTerm) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.postal_code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterProvince) {
      filtered = filtered.filter(shop => shop.state === filterProvince);
    }

    setFilteredShops(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterProvince, shops]);

  async function fetchShops() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('name');

      if (error) throw error;
      setShops(data || []);
      setFilteredShops(data || []);
    } catch (err) {
      console.error('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  }

  async function toggleVerified(shopId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('listings')
        // @ts-ignore - Supabase type inference issue
        .update({ is_verified: !currentStatus } as any)
        .eq('id', shopId);

      if (error) throw error;

      // Update local state
      setShops(shops.map(shop =>
        shop.id === shopId ? { ...shop, is_verified: !currentStatus } : shop
      ));
    } catch (err) {
      console.error('Error updating shop:', err);
      alert('Failed to update shop');
    }
  }

  async function deleteShop(shopId: string, shopName: string) {
    if (!confirm(`Are you sure you want to delete "${shopName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', shopId);

      if (error) throw error;

      setShops(shops.filter(shop => shop.id !== shopId));
      alert('Shop deleted successfully');
    } catch (err) {
      console.error('Error deleting shop:', err);
      alert('Failed to delete shop');
    }
  }

  const provinces = (Array.from(new Set(shops.map(s => s.state).filter(Boolean))) as string[]).sort();

  // Pagination
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);
  const totalPages = Math.ceil(filteredShops.length / shopsPerPage);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading shops...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shops Management</h1>
            <p className="text-gray-600 mt-1">Manage all tire shops in your directory</p>
          </div>
          <Link
            href="/add-shop"
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            + Add New Shop
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, city, or postal code..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province
              </label>
              <select
                value={filterProvince}
                onChange={(e) => setFilterProvince(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="">All Provinces</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterProvince('');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing <span className="font-semibold">{indexOfFirstShop + 1}</span> to{' '}
              <span className="font-semibold">{Math.min(indexOfLastShop, filteredShops.length)}</span> of{' '}
              <span className="font-semibold">{filteredShops.length}</span> shops
            </span>
            <span className="text-gray-600">
              Total: <span className="font-semibold">{shops.length}</span> shops
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentShops.map((shop) => (
                  <tr key={shop.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">{shop.name}</div>
                          <div className="text-sm text-gray-500">{shop.postal_code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{shop.city}</div>
                      <div className="text-sm text-gray-500">{shop.state}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {shop.phone || '—'}
                    </td>
                    <td className="px-6 py-4">
                      {shop.average_rating ? (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm font-medium">{shop.average_rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500 ml-1">({shop.reviews_count || 0})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No reviews</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVerified(shop.id, shop.is_verified || false)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          shop.is_verified
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {shop.is_verified ? 'Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/shop/${shop.id}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteShop(shop.id, shop.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
