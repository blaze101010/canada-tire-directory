import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { siteConfig } from '@/lib/config';
import { TireShop } from '@/types';

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: shopId } = await params;

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

    const typedShop = shop as TireShop | null;

    if (!typedShop) {
      return {
        title: 'Shop Not Found | TireShopPro.ca',
        description: 'The tire shop you are looking for could not be found.',
      };
    }

    const canonicalUrl = `${siteConfig.url}/shop/${typedShop.slug || typedShop.id}`;
    const title = `${typedShop.name} - Tire Shop in ${typedShop.city}, ${typedShop.state || 'Canada'}`;
    const description = typedShop.description ||
      `Visit ${typedShop.name} in ${typedShop.city}, ${typedShop.state || 'Canada'}. Find tire services, contact information, hours of operation, and customer reviews. ${typedShop.full_address || ''}`.substring(0, 160);

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
        type: 'website',
        locale: 'en_CA',
        images: typedShop.photo_url ? [{ url: typedShop.photo_url }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: typedShop.photo_url ? [typedShop.photo_url] : [],
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
