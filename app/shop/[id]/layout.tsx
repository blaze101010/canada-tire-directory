import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/config';

type Props = {
  params: { id: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shopId = params.id;

  try {
    // Fetch shop details by slug first, fallback to id
    let { data: shop } = await supabase
      .from('listings')
      .select('*')
      .eq('slug', shopId)
      .single();

    // Fallback to ID if slug not found
    if (!shop) {
      const { data: shopById } = await supabase
        .from('listings')
        .select('*')
        .eq('id', shopId)
        .single();
      shop = shopById;
    }

    if (!shop) {
      return {
        title: 'Shop Not Found | TireShopPro.ca',
        description: 'The tire shop you are looking for could not be found.',
      };
    }

    const canonicalUrl = `${siteConfig.url}/shop/${shop.slug || shop.id}`;
    const title = `${shop.name} - Tire Shop in ${shop.city}, ${shop.state || 'Canada'}`;
    const description = shop.description ||
      `Visit ${shop.name} in ${shop.city}, ${shop.state || 'Canada'}. Find tire services, contact information, hours of operation, and customer reviews. ${shop.full_address || ''}`.substring(0, 160);

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: siteConfig.name,
        type: 'business.business',
        locale: 'en_CA',
        images: shop.photo_url ? [{ url: shop.photo_url }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: shop.photo_url ? [shop.photo_url] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for shop:', error);
    return {
      title: 'Tire Shop | TireShopPro.ca',
      description: 'Find tire shops near you across Canada',
      alternates: {
        canonical: `${siteConfig.url}/shop/${shopId}`,
      },
    };
  }
}

export default function ShopLayout({ children }: Props) {
  return <>{children}</>;
}
