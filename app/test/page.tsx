'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function test() {
      try {
        console.log('🔍 Starting test query...');

        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .limit(5);

        console.log('📊 Query result:', { data, error });

        if (error) {
          setError(error);
          setStatus('Error occurred');
        } else {
          setData(data);
          setStatus(`Success! Found ${data?.length || 0} listings`);
        }
      } catch (err: any) {
        console.error('💥 Exception:', err);
        setError(err);
        setStatus('Exception occurred');
      }
    }

    test();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
          <p className="text-lg">{status}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify({
              SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
              SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (hidden)' : 'NOT SET'
            }, null, 2)}
          </pre>
        </div>

        {error && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-red-600">Error:</h2>
            <pre className="bg-red-50 p-4 rounded overflow-auto text-red-800">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}

        {data && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Data:</h2>
            <pre className="bg-green-50 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
