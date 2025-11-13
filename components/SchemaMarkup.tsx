import Script from 'next/script';
import { siteConfig } from '@/lib/config';

interface SchemaMarkupProps {
  type: 'website' | 'itemlist' | 'faqpage' | 'localbusiness';
  data?: any;
}

export default function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  const getSchema = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': siteConfig.name,
          'description': siteConfig.description,
          'url': siteConfig.url,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${siteConfig.url}?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        };

      case 'itemlist':
        return {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'name': 'Canadian Tire Shops Directory',
          'description': 'Comprehensive directory of tire shops across Canada',
          'numberOfItems': data?.totalShops || 6730,
          'itemListElement': data?.cities?.slice(0, 10).map((city: any, index: number) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'name': `Tire Shop ${city.city}`,
            'url': `${siteConfig.url}/tire-shops/${city.province.toLowerCase().replace(/\s+/g, '-')}/${city.city.toLowerCase().replace(/\s+/g, '-')}`
          })) || []
        };

      case 'faqpage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How do I find a tire shop near me?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Use TireShopPro.ca to search for tire shops by city, postal code, or shop name. Browse our directory of 6,730+ tire shops across Canada with detailed information on services, hours, and contact details.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What services do tire shops offer?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Most tire shops offer tire sales, tire installation, wheel alignment, tire rotation, brake service, oil changes, tire repair, balancing, inspections, and seasonal tire storage. Use our directory to find shops that offer specific services you need.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How many tire shops are listed on TireShopPro.ca?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'TireShopPro.ca features 6,730+ tire shops across Canada, covering all provinces and major cities. Our directory includes independent tire shops, chain stores, and authorized dealers.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is TireShopPro.ca free to use?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, TireShopPro.ca is completely free for consumers. Browse our comprehensive directory, compare tire shops, view services offered, and find contact information at no cost.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I add my tire shop to the directory?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, tire shop owners can add their business to TireShopPro.ca. Contact us to get your shop listed and reach thousands of potential customers searching for tire services in your area.'
              }
            }
          ]
        };

      case 'localbusiness':
        const shop = data?.shop;
        if (!shop) return {};

        // Build opening hours specification
        const openingHours = [];
        const dayMap: { [key: string]: string } = {
          'hours_monday': 'Monday',
          'hours_tuesday': 'Tuesday',
          'hours_wednesday': 'Wednesday',
          'hours_thursday': 'Thursday',
          'hours_friday': 'Friday',
          'hours_saturday': 'Saturday',
          'hours_sunday': 'Sunday'
        };

        // Convert hours to Schema.org format
        Object.entries(dayMap).forEach(([key, day]) => {
          const hours = shop[key];
          if (hours && hours !== 'Closed' && hours !== 'N/A') {
            // Parse hours like "9:00 AM - 6:00 PM" to "09:00-18:00"
            const match = hours.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
            if (match) {
              let [, startHour, startMin, startPeriod, endHour, endMin, endPeriod] = match;

              // Convert to 24-hour format
              let startHour24 = parseInt(startHour);
              let endHour24 = parseInt(endHour);

              if (startPeriod.toUpperCase() === 'PM' && startHour24 !== 12) startHour24 += 12;
              if (startPeriod.toUpperCase() === 'AM' && startHour24 === 12) startHour24 = 0;
              if (endPeriod.toUpperCase() === 'PM' && endHour24 !== 12) endHour24 += 12;
              if (endPeriod.toUpperCase() === 'AM' && endHour24 === 12) endHour24 = 0;

              openingHours.push({
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': day,
                'opens': `${String(startHour24).padStart(2, '0')}:${startMin}`,
                'closes': `${String(endHour24).padStart(2, '0')}:${endMin}`
              });
            }
          }
        });

        const schema: any = {
          '@context': 'https://schema.org',
          '@type': 'TireShop',
          'name': shop.name,
          'url': `${siteConfig.url}/shop/${shop.id}`,
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': shop.street || shop.full_address,
            'addressLocality': shop.city,
            'addressRegion': shop.state,
            'postalCode': shop.postal_code,
            'addressCountry': 'CA'
          }
        };

        // Add optional fields
        if (shop.phone) schema.telephone = shop.phone;
        if (shop.site) schema.url = shop.site;
        if (shop.description) schema.description = shop.description;
        if (shop.latitude && shop.longitude) {
          schema.geo = {
            '@type': 'GeoCoordinates',
            'latitude': shop.latitude,
            'longitude': shop.longitude
          };
        }
        if (openingHours.length > 0) schema.openingHoursSpecification = openingHours;
        if (shop.average_rating) {
          schema.aggregateRating = {
            '@type': 'AggregateRating',
            'ratingValue': shop.average_rating,
            'reviewCount': shop.reviews_count || 0
          };
        }
        if (shop.photo_url) schema.image = shop.photo_url;

        return schema;

      default:
        return {};
    }
  };

  const schema = getSchema();

  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
