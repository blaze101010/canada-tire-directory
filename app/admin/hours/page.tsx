'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { supabase } from '@/lib/supabase';
import { TireShop } from '@/types';
import Link from 'next/link';

export default function WorkingHoursManagement() {
  const [stats, setStats] = useState({
    total: 0,
    withHours: 0,
    without: 0,
  });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: shops, error } = await supabase
        .from('listings')
        .select('id, hours_monday, hours_tuesday');

      if (error) throw error;

      const typedShops = (shops || []) as Pick<TireShop, 'id' | 'hours_monday' | 'hours_tuesday'>[];
      const total = typedShops.length;
      const withHours = typedShops.filter(s => s.hours_monday || s.hours_tuesday).length;
      const without = total - withHours;

      setStats({ total, withHours, without });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    setImporting(true);
    setImportResults(null);

    try {
      const text = await file.text();
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));

      let updated = 0;
      let failed = 0;
      let notFound = 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line
        const values: string[] = [];
        let currentValue = '';
        let inQuotes = false;

        for (let char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue.trim());
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim());

        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        if (!row.shop_id && !row.shop_name) {
          failed++;
          continue;
        }

        // Prepare update data
        const updateData: Partial<TireShop> = {
          hours_last_updated: new Date().toISOString(),
        };

        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        days.forEach(day => {
          if (row[day]) {
            const normalized = row[day].toLowerCase() === 'closed' ? 'Closed' :
              row[day].toLowerCase().includes('24 hour') ? 'Open 24 hours' :
              row[day].toLowerCase() === 'n/a' || row[day] === '-' ? 'N/A' :
              row[day];
            (updateData as any)[`hours_${day}`] = normalized;
          }
        });

        if (row.is_24_hours) {
          updateData.is_24_hours = row.is_24_hours.toLowerCase() === 'true' || row.is_24_hours === '1';
        }

        // Update shop
        // @ts-ignore - Supabase type inference issue with dynamic update data
        let query = supabase.from('listings').update(updateData as any);

        if (row.shop_id) {
          query = query.eq('id', row.shop_id);
        } else {
          query = query.eq('name', row.shop_name);
        }

        const { data, error } = await query.select();

        if (error) {
          failed++;
        } else if (!data || data.length === 0) {
          notFound++;
        } else {
          updated++;
        }
      }

      setImportResults({
        total: lines.length - 1,
        updated,
        notFound,
        failed,
        successRate: ((updated / (lines.length - 1)) * 100).toFixed(1)
      });

      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error('Error importing CSV:', err);
      alert('Failed to import CSV file. Please check the format.');
    } finally {
      setImporting(false);
      // Reset file input
      event.target.value = '';
    }
  }

  async function exportToCSV() {
    try {
      setLoading(true);
      const { data: shops, error } = await supabase
        .from('listings')
        .select('id, name, full_address, phone, city, state, hours_monday, hours_tuesday, hours_wednesday, hours_thursday, hours_friday, hours_saturday, hours_sunday, is_24_hours, is_open_now')
        .order('name');

      if (error) throw error;

      const typedShops = (shops || []) as TireShop[];

      // Create CSV content
      const headers = [
        'shop_id', 'shop_name', 'address', 'phone', 'city', 'province',
        'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
        'is_24_hours', 'is_open_now'
      ];

      let csvContent = headers.join(',') + '\n';

      typedShops.forEach(shop => {
        const row = [
          shop.id,
          `"${shop.name.replace(/"/g, '""')}"`,
          shop.full_address ? `"${shop.full_address.replace(/"/g, '""')}"` : '',
          shop.phone || '',
          shop.city,
          shop.state || '',
          shop.hours_monday || '',
          shop.hours_tuesday || '',
          shop.hours_wednesday || '',
          shop.hours_thursday || '',
          shop.hours_friday || '',
          shop.hours_saturday || '',
          shop.hours_sunday || '',
          shop.is_24_hours ? 'true' : 'false',
          shop.is_open_now ? 'true' : ''
        ];
        csvContent += row.join(',') + '\n';
      });

      // Download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `working-hours-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting CSV:', err);
      alert('Failed to export CSV');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading...</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Working Hours Management</h1>
          <p className="text-gray-600 mt-1">Bulk import and manage shop working hours</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Shops</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
              </div>
              <div className="text-4xl">🏪</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">With Hours</p>
                <p className="text-3xl font-bold text-green-600">{stats.withHours.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {((stats.withHours / stats.total) * 100).toFixed(0)}% coverage
                </p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Without Hours</p>
                <p className="text-3xl font-bold text-red-600">{stats.without.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Need updating</p>
              </div>
              <div className="text-4xl">⏰</div>
            </div>
          </div>
        </div>

        {/* CSV Import/Export */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">CSV Import/Export</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Section */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📥</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Export to CSV</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Download all shops with current working hours in CSV format
                  </p>
                  <button
                    onClick={exportToCSV}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Download CSV Template
                  </button>
                </div>
              </div>
            </div>

            {/* Import Section */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📤</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Import from CSV</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file with working hours to bulk update shops
                  </p>
                  <label className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center cursor-pointer">
                    {importing ? 'Importing...' : 'Upload CSV File'}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      disabled={importing}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Import Results */}
          {importResults && (
            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">Import Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Rows:</span>
                  <span className="ml-2 font-semibold">{importResults.total}</span>
                </div>
                <div>
                  <span className="text-green-600">Updated:</span>
                  <span className="ml-2 font-semibold text-green-700">{importResults.updated}</span>
                </div>
                <div>
                  <span className="text-yellow-600">Not Found:</span>
                  <span className="ml-2 font-semibold text-yellow-700">{importResults.notFound}</span>
                </div>
                <div>
                  <span className="text-red-600">Failed:</span>
                  <span className="ml-2 font-semibold text-red-700">{importResults.failed}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <span className="text-blue-900">Success Rate:</span>
                <span className="ml-2 font-bold text-blue-700">{importResults.successRate}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Documentation */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">CSV Format Guide</h2>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Required Columns:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><code className="bg-gray-100 px-2 py-1 rounded">shop_id</code> or <code className="bg-gray-100 px-2 py-1 rounded">shop_name</code> - Shop identifier</li>
                <li><code className="bg-gray-100 px-2 py-1 rounded">monday</code> through <code className="bg-gray-100 px-2 py-1 rounded">sunday</code> - Working hours for each day</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Hour Format Examples:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>"9:00 AM - 6:00 PM" - Standard hours</li>
                <li>"Closed" - Shop is closed that day</li>
                <li>"Open 24 hours" - 24/7 operation</li>
                <li>"N/A" - Hours unknown</li>
              </ul>
            </div>

            <div>
              <Link
                href="/docs/CSV_IMPORT_GUIDE.md"
                target="_blank"
                className="inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                View Full Documentation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
