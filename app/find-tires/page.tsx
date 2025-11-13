'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';

interface TireCategory {
  id: string;
  name: string;
  description: string;
}

interface TireSize {
  id: string;
  size: string;
  display_name: string;
}

interface TireBrand {
  id: string;
  name: string;
}

export default function FindTiresPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  // Reference data
  const [categories, setCategories] = useState<TireCategory[]>([]);
  const [sizes, setSizes] = useState<TireSize[]>([]);
  const [brands, setBrands] = useState<TireBrand[]>([]);

  // User selections
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [quantity, setQuantity] = useState(4);
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [needsInstallation, setNeedsInstallation] = useState(true);
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  // Vehicle info
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');

  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
    'Prince Edward Island', 'Quebec', 'Saskatchewan',
  ];

  useEffect(() => {
    loadReferenceData();
  }, []);

  async function loadReferenceData() {
    try {
      const [categoriesRes, sizesRes, brandsRes] = await Promise.all([
        supabase.from('tire_categories').select('*').order('name'),
        supabase.from('tire_sizes').select('*').order('size'),
        supabase.from('tire_brands').select('*').order('name'),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (sizesRes.data) setSizes(sizesRes.data);
      if (brandsRes.data) setBrands(brandsRes.data);
    } catch (error) {
      console.error('Error loading reference data:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleBack() {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleFindTires() {
    // Build query parameters
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSize) params.set('size', selectedSize);
    if (selectedBrand) params.set('brand', selectedBrand);
    if (quantity) params.set('quantity', quantity.toString());
    if (budgetMin) params.set('minPrice', budgetMin);
    if (budgetMax) params.set('maxPrice', budgetMax);
    if (needsInstallation) params.set('installation', 'true');
    if (city) params.set('city', city);
    if (province) params.set('province', province);

    router.push(`/compare-prices?${params.toString()}`);
  }

  const canProceedStep1 = selectedCategory && selectedSize;
  const canProceedStep2 = true; // Vehicle info is optional
  const canProceedStep3 = quantity > 0;
  const canProceedStep4 = province;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 5</span>
            <span className="text-sm text-gray-500">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Tire Type and Size */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                What type of tires do you need?
              </h2>
              <p className="text-gray-600 mb-8">Select the category and size that fits your vehicle</p>

              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tire Category *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 border-2 rounded-lg text-left transition-all ${
                          selectedCategory === category.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Tire Size *
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Select your tire size...</option>
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.display_name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Tip: You can find your tire size on the sidewall of your current tires
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Information */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Tell us about your vehicle
              </h2>
              <p className="text-gray-600 mb-8">This helps us find the perfect tires (optional)</p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      placeholder="2020"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Make
                    </label>
                    <input
                      type="text"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      placeholder="Toyota"
                      list="car-makes"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <datalist id="car-makes">
                      <option value="Acura" />
                      <option value="Audi" />
                      <option value="BMW" />
                      <option value="Buick" />
                      <option value="Cadillac" />
                      <option value="Chevrolet" />
                      <option value="Chrysler" />
                      <option value="Dodge" />
                      <option value="Ford" />
                      <option value="GMC" />
                      <option value="Honda" />
                      <option value="Hyundai" />
                      <option value="Infiniti" />
                      <option value="Jeep" />
                      <option value="Kia" />
                      <option value="Lexus" />
                      <option value="Lincoln" />
                      <option value="Mazda" />
                      <option value="Mercedes-Benz" />
                      <option value="Mitsubishi" />
                      <option value="Nissan" />
                      <option value="Ram" />
                      <option value="Subaru" />
                      <option value="Tesla" />
                      <option value="Toyota" />
                      <option value="Volkswagen" />
                      <option value="Volvo" />
                    </datalist>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Model
                    </label>
                    <input
                      type="text"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="Camry"
                      list="car-models"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    />
                    <datalist id="car-models">
                      {/* Toyota */}
                      <option value="Camry" />
                      <option value="Corolla" />
                      <option value="RAV4" />
                      <option value="Highlander" />
                      <option value="Tacoma" />
                      <option value="Tundra" />
                      <option value="4Runner" />
                      <option value="Sienna" />

                      {/* Honda */}
                      <option value="Civic" />
                      <option value="Accord" />
                      <option value="CR-V" />
                      <option value="Pilot" />
                      <option value="Odyssey" />
                      <option value="Ridgeline" />

                      {/* Ford */}
                      <option value="F-150" />
                      <option value="F-250" />
                      <option value="F-350" />
                      <option value="Escape" />
                      <option value="Explorer" />
                      <option value="Edge" />
                      <option value="Mustang" />
                      <option value="Bronco" />
                      <option value="Ranger" />

                      {/* Chevrolet */}
                      <option value="Silverado 1500" />
                      <option value="Silverado 2500" />
                      <option value="Equinox" />
                      <option value="Traverse" />
                      <option value="Tahoe" />
                      <option value="Suburban" />
                      <option value="Colorado" />

                      {/* Nissan */}
                      <option value="Altima" />
                      <option value="Rogue" />
                      <option value="Sentra" />
                      <option value="Pathfinder" />
                      <option value="Murano" />
                      <option value="Frontier" />

                      {/* Mazda */}
                      <option value="CX-5" />
                      <option value="CX-9" />
                      <option value="Mazda3" />
                      <option value="CX-30" />

                      {/* Hyundai */}
                      <option value="Elantra" />
                      <option value="Sonata" />
                      <option value="Tucson" />
                      <option value="Santa Fe" />
                      <option value="Palisade" />

                      {/* Kia */}
                      <option value="Forte" />
                      <option value="Optima" />
                      <option value="Sorento" />
                      <option value="Sportage" />
                      <option value="Telluride" />

                      {/* Subaru */}
                      <option value="Outback" />
                      <option value="Forester" />
                      <option value="Crosstrek" />
                      <option value="Impreza" />
                      <option value="Ascent" />

                      {/* Jeep */}
                      <option value="Wrangler" />
                      <option value="Grand Cherokee" />
                      <option value="Cherokee" />
                      <option value="Compass" />
                      <option value="Gladiator" />

                      {/* RAM */}
                      <option value="1500" />
                      <option value="2500" />
                      <option value="3500" />

                      {/* GMC */}
                      <option value="Sierra 1500" />
                      <option value="Sierra 2500" />
                      <option value="Yukon" />
                      <option value="Terrain" />
                      <option value="Acadia" />

                      {/* Volkswagen */}
                      <option value="Jetta" />
                      <option value="Tiguan" />
                      <option value="Atlas" />
                      <option value="Golf" />

                      {/* Dodge */}
                      <option value="Durango" />
                      <option value="Charger" />
                      <option value="Challenger" />

                      {/* Tesla */}
                      <option value="Model 3" />
                      <option value="Model Y" />
                      <option value="Model S" />
                      <option value="Model X" />

                      {/* BMW */}
                      <option value="3 Series" />
                      <option value="5 Series" />
                      <option value="X3" />
                      <option value="X5" />

                      {/* Mercedes-Benz */}
                      <option value="C-Class" />
                      <option value="E-Class" />
                      <option value="GLC" />
                      <option value="GLE" />
                    </datalist>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-blue-800">
                    ℹ️ Providing your vehicle information helps shops recommend the best tires for your specific vehicle.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Set your preferences
              </h2>
              <p className="text-gray-600 mb-8">Tell us your budget and requirements</p>

              <div className="space-y-6">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    How many tires do you need? *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`py-3 border-2 rounded-lg font-semibold transition-all ${
                          quantity === num
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Preference */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Preferred Brand (Optional)
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="">No preference</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Budget per Tire (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={budgetMin}
                        onChange={(e) => setBudgetMin(e.target.value)}
                        placeholder="Min $"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={budgetMax}
                        onChange={(e) => setBudgetMax(e.target.value)}
                        placeholder="Max $"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Installation */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needsInstallation}
                      onChange={(e) => setNeedsInstallation(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-900 font-medium">
                      I need installation services
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Where are you located?
              </h2>
              <p className="text-gray-600 mb-8">We'll find shops near you with the best prices</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Province *
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Select province...</option>
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City (Optional)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Review your selections
              </h2>
              <p className="text-gray-600 mb-8">Make sure everything looks good</p>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tire Requirements</h3>
                  <div className="space-y-1 text-gray-700">
                    <p><strong>Category:</strong> {categories.find(c => c.id === selectedCategory)?.name}</p>
                    <p><strong>Size:</strong> {sizes.find(s => s.id === selectedSize)?.display_name}</p>
                    {selectedBrand && (
                      <p><strong>Brand:</strong> {brands.find(b => b.id === selectedBrand)?.name}</p>
                    )}
                    <p><strong>Quantity:</strong> {quantity} tires</p>
                  </div>
                </div>

                {(vehicleYear || vehicleMake || vehicleModel) && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Vehicle</h3>
                    <p className="text-gray-700">
                      {vehicleYear} {vehicleMake} {vehicleModel}
                    </p>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Preferences</h3>
                  <div className="space-y-1 text-gray-700">
                    {(budgetMin || budgetMax) && (
                      <p><strong>Budget:</strong> ${budgetMin || '0'} - ${budgetMax || '∞'} per tire</p>
                    )}
                    <p><strong>Installation:</strong> {needsInstallation ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700">
                    {city ? `${city}, ` : ''}{province}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                step === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Back
            </button>

            {step < 5 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !canProceedStep1) ||
                  (step === 3 && !canProceedStep3) ||
                  (step === 4 && !canProceedStep4)
                }
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  (step === 1 && !canProceedStep1) ||
                  (step === 3 && !canProceedStep3) ||
                  (step === 4 && !canProceedStep4)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleFindTires}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <span>🔍</span>
                Find Best Prices
              </button>
            )}
          </div>
        </div>

        {/* Skip to Results */}
        {step < 5 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setStep(5)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Skip to review →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
