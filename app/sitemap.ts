import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/config';
import { TireShop } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Fetch all shops to get unique provinces and cities
  const { data: shops } = await supabase
    .from('listings')
    .select('state, city')
    .not('state', 'is', null)
    .not('city', 'is', null);

  const typedShops = (shops || []) as Pick<TireShop, 'state' | 'city'>[];

  if (typedShops.length === 0) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }

  // Get unique provinces
  const provinces = [...new Set(typedShops.map(s => s.state).filter(Boolean))] as string[];

  // Get unique cities with their provinces
  const cityProvinceMap: { [key: string]: string } = {};
  typedShops.forEach(shop => {
    if (shop.city && shop.state) {
      const key = `${shop.city}|${shop.state}`;
      if (!cityProvinceMap[key]) {
        cityProvinceMap[key] = shop.state;
      }
    }
  });

  // Homepage
  const homeUrl = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  };

  // Province pages
  const provinceUrls = provinces.map(province => ({
    url: `${baseUrl}/tire-shops/${province.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // City pages
  const cityUrls = Object.keys(cityProvinceMap).map(key => {
    const [city, province] = key.split('|');
    const provinceSlug = province.toLowerCase().replace(/\s+/g, '-');
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');

    return {
      url: `${baseUrl}/tire-shops/${provinceSlug}/${citySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  return [homeUrl, ...provinceUrls, ...cityUrls];
}
