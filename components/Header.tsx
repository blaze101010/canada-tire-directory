'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  totalShops?: number;
  activeVisitors?: number;
}

export default function Header({ totalShops = 6730, activeVisitors = 1250 }: HeaderProps) {
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [showStatesDropdown, setShowStatesDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [displayedVisitors, setDisplayedVisitors] = useState(0);
  const router = useRouter();
  const { user, signOut } = useAuth();

  // Counting animation for active visitors
  useEffect(() => {
    if (!showTopBanner) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = activeVisitors / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= activeVisitors) {
        setDisplayedVisitors(activeVisitors);
        clearInterval(timer);
      } else {
        setDisplayedVisitors(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [activeVisitors, showTopBanner]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Canadian provinces
  const provinces = [
    { name: 'Alberta', code: 'AB', count: 958 },
    { name: 'British Columbia', code: 'BC', count: 17 },
    { name: 'Manitoba', code: 'MB', count: 0 },
    { name: 'New Brunswick', code: 'NB', count: 0 },
    { name: 'Newfoundland and Labrador', code: 'NL', count: 0 },
    { name: 'Nova Scotia', code: 'NS', count: 0 },
    { name: 'Ontario', code: 'ON', count: 0 },
    { name: 'Prince Edward Island', code: 'PE', count: 0 },
    { name: 'Quebec', code: 'QC', count: 0 },
    { name: 'Saskatchewan', code: 'SK', count: 0 },
  ];

  return (
    <>
      {/* Top Banner */}
      {showTopBanner && (
        <div className="bg-blue-600 text-white py-3 px-4 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="font-medium">
                <strong className="inline-block min-w-[80px] transition-all duration-100">
                  {displayedVisitors.toLocaleString()}+
                </strong> people browsing this month
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏪</span>
                <span>
                  Own a tire shop? Get{' '}
                  <Link href="/advertise" className="underline font-semibold">
                    premium visibility
                  </Link>
                </span>
              </div>
              <Link
                href="/advertise"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Learn More →
              </Link>
              <button
                onClick={() => setShowTopBanner(false)}
                className="text-white/80 hover:text-white ml-2"
                aria-label="Close banner"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 leading-tight">
                  TireShopPro
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>

              {/* Browse States Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowStatesDropdown(!showStatesDropdown)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  onBlur={() => setTimeout(() => setShowStatesDropdown(false), 200)}
                >
                  Browse Provinces
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showStatesDropdown ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showStatesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    {provinces.map((province) => (
                      <Link
                        key={province.code}
                        href={`/tire-shops/${province.name.toLowerCase().replace(/ /g, '-')}`}
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors"
                        onClick={() => setShowStatesDropdown(false)}
                      >
                        <span className="text-gray-700">{province.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/advertise"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Advertise With Us
              </Link>

              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/add-shop"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Add Your Store
              </Link>

              {user ? (
                // Authenticated user menu
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showUserMenu ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/my-shops"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition-colors text-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <span>🏪</span>
                        <span>My Shops</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 transition-colors text-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <span>👤</span>
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition-colors text-red-600 border-t border-gray-100 mt-1"
                      >
                        <span>🚪</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Not authenticated
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Blue Bottom Border */}
        <div className="h-1 bg-blue-600"></div>
      </header>
    </>
  );
}
