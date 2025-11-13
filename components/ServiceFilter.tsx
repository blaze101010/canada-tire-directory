'use client';

interface ServiceFilterProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
}

const AVAILABLE_SERVICES = [
  { id: 'tire-sales', label: 'Tire Sales', icon: '🛞' },
  { id: 'installation', label: 'Installation', icon: '🔧' },
  { id: 'alignment', label: 'Wheel Alignment', icon: '⚖️' },
  { id: 'rotation', label: 'Tire Rotation', icon: '🔄' },
  { id: 'repair', label: 'Flat Repair', icon: '🛠️' },
  { id: 'balancing', label: 'Balancing', icon: '⚙️' },
  { id: 'oil-change', label: 'Oil Change', icon: '🛢️' },
  { id: 'brake', label: 'Brake Service', icon: '🛑' },
];

export default function ServiceFilter({ selectedServices, onServiceToggle }: ServiceFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">🔍</span>
        Filter by Services
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {AVAILABLE_SERVICES.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              onClick={() => onServiceToggle(service.id)}
              className={`
                flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all
                ${isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                }
              `}
            >
              <span className="text-xl">{service.icon}</span>
              <span className="text-sm font-semibold">{service.label}</span>
            </button>
          );
        })}
      </div>
      {selectedServices.length > 0 && (
        <button
          onClick={() => selectedServices.forEach(s => onServiceToggle(s))}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
