import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ province: string; city: string }> }): Promise<Metadata> {
  const { province: provinceSlug, city: citySlug } = await params;

  const provinceName = decodeURIComponent(provinceSlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const cityName = decodeURIComponent(citySlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fetch shop count for this city
  const { count } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .ilike('state', provinceName)
    .ilike('city', cityName);

  const shopCount = count || 0;

  const title = `Tire Shop ${cityName} | ${shopCount}+ Tire Shops in ${cityName}, ${provinceName} | TireShopPro.ca`;
  const description = `Find tire shops in ${cityName}, ${provinceName}. Browse ${shopCount}+ local tire shops offering tire sales, installation, wheel alignment, and repair services. Compare prices and book appointments.`;

  return {
    title,
    description,
    keywords: `tire shop ${cityName}, tire shops ${cityName}, ${cityName} tire shop, tire installation ${cityName}, wheel alignment ${cityName}, tire repair ${cityName}, tire services ${cityName} ${provinceName}`,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/tire-shops/${provinceSlug}/${citySlug}`,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: `Tire Shops in ${cityName}, ${provinceName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://tireshoppro.ca/tire-shops/${provinceSlug}/${citySlug}`,
    },
  };
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
