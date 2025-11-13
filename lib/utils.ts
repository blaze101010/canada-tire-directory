/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 * @param km Distance in kilometers
 * @returns Formatted string
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)}m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Check if a shop matches selected service filters
 * @param shop The tire shop to check
 * @param selectedServices Array of selected service IDs
 * @returns true if shop matches all selected services
 */
export function shopMatchesServices(shop: any, selectedServices: string[]): boolean {
  if (selectedServices.length === 0) return true;

  const serviceMapping: { [key: string]: string[] } = {
    'tire-sales': ['tire sales', 'tires', 'new tires'],
    'installation': ['installation', 'mounting', 'install'],
    'alignment': ['alignment', 'wheel alignment'],
    'rotation': ['rotation', 'tire rotation'],
    'repair': ['repair', 'flat repair', 'puncture'],
    'balancing': ['balancing', 'wheel balancing', 'balance'],
    'oil-change': ['oil change', 'oil service', 'oil'],
    'brake': ['brake', 'brakes', 'brake service'],
  };

  return selectedServices.every(serviceId => {
    const keywords = serviceMapping[serviceId] || [];
    const shopServices = (shop as any).services || [];

    return keywords.some(keyword =>
      shopServices.some((service: string) =>
        service.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  });
}
