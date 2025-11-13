import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/config';

export async function generateMetadata({ params }: { params: Promise<{ province: string }> }): Promise<Metadata> {
  const { province: provinceSlug } = await params;
  const provinceName = decodeURIComponent(provinceSlug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Fetch shop count for this province
  const { count } = await supabase
    .from('listings')
    .select('*', { count: 'exact', head: true })
    .ilike('state', provinceName);

  const shopCount = count || 0;

  const title = `Tire Shops in ${provinceName} | ${shopCount}+ Locations | TireShopPro.ca`;
  const description = `Find the best tire shops in ${provinceName}. Browse ${shopCount}+ tire shops with services including tire sales, installation, alignment, and repair. Compare prices and find tire shops near you.`;

  return {
    title,
    description,
    keywords: `tire shop ${provinceName}, tire shops in ${provinceName}, tire installation ${provinceName}, wheel alignment ${provinceName}, tire repair ${provinceName}, tire services ${provinceName}`,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/tire-shops/${provinceSlug}`,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: `Tire Shops in ${provinceName}`,
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
  };
}

export default function ProvinceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
