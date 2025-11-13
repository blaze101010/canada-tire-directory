'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TireShop } from '@/types';

// Fix for default marker icon in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  shops: TireShop[];
  center?: [number, number];
  zoom?: number;
}

// Component to fit map bounds to markers
function FitBounds({ shops }: { shops: TireShop[] }) {
  const map = useMap();

  useEffect(() => {
    if (shops.length > 0) {
      const validShops = shops.filter(shop => shop.latitude && shop.longitude);
      if (validShops.length > 0) {
        const bounds = L.latLngBounds(
          validShops.map(shop => [shop.latitude!, shop.longitude!])
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
      }
    }
  }, [shops, map]);

  return null;
}

export default function Map({ shops, center, zoom = 11 }: MapProps) {
  // Filter shops that have valid coordinates
  const shopsWithCoords = shops.filter(shop =>
    shop.latitude &&
    shop.longitude &&
    !isNaN(shop.latitude) &&
    !isNaN(shop.longitude)
  );

  // Calculate center from shops if not provided
  const mapCenter = center || (shopsWithCoords.length > 0
    ? [
        shopsWithCoords.reduce((sum, shop) => sum + shop.latitude!, 0) / shopsWithCoords.length,
        shopsWithCoords.reduce((sum, shop) => sum + shop.longitude!, 0) / shopsWithCoords.length
      ] as [number, number]
    : [56.1304, -106.3468] as [number, number] // Center of Canada as fallback
  );

  if (shopsWithCoords.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
        <div className="text-center p-6">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-gray-600 font-semibold">Map View Not Available</p>
          <p className="text-gray-500 text-sm mt-2">Location data not available for these shops</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds shops={shopsWithCoords} />
        {shopsWithCoords.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.latitude!, shop.longitude!]}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-base mb-1">{shop.name}</h3>
                {shop.full_address && (
                  <p className="text-sm text-gray-600 mb-2">{shop.full_address}</p>
                )}
                {shop.phone && (
                  <p className="text-sm text-blue-600 mb-2">
                    <a href={`tel:${shop.phone}`}>{shop.phone}</a>
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
