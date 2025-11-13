// Main application types (matching Supabase schema)
export interface WorkingHours {
  monday?: string | null;
  tuesday?: string | null;
  wednesday?: string | null;
  thursday?: string | null;
  friday?: string | null;
  saturday?: string | null;
  sunday?: string | null;
}

export interface TireShop {
  id: string;
  name: string;
  slug?: string | null;
  site?: string | null;
  phone?: string | null;
  full_address?: string | null;
  street?: string | null;
  city: string;
  postal_code?: string | null;
  state?: string | null;
  province_code?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  reviews_count?: number | null;
  average_rating?: number | null;
  photo_url?: string | null;
  business_status?: string | null;
  description?: string | null;
  booking_appointment_link?: string | null;
  is_featured?: boolean | null;
  is_verified?: boolean | null;
  working_hours?: any | null;
  hours_monday?: string | null;
  hours_tuesday?: string | null;
  hours_wednesday?: string | null;
  hours_thursday?: string | null;
  hours_friday?: string | null;
  hours_saturday?: string | null;
  hours_sunday?: string | null;
  is_open_now?: boolean | null;
  is_24_hours?: boolean | null;
  hours_last_updated?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export type Province = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'ON' | 'PE' | 'QC' | 'SK' | 'NT' | 'NU' | 'YT';

export interface Review {
  id: string;
  listing_id: string;
  rating: number;
  reviewer_name: string;
  reviewer_email?: string | null;
  title?: string | null;
  comment: string;
  service_type?: string | null;
  visit_date?: string | null;
  would_recommend: boolean;
  is_verified: boolean;
  is_approved: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}
