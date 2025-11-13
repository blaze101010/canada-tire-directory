// Supabase Database Types
// This file contains type definitions for your Supabase database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tire_shops: {
        Row: {
          id: string
          name: string
          slug: string | null
          site: string | null
          phone: string | null
          full_address: string | null
          street: string | null
          city: string
          postal_code: string | null
          state: string | null
          province_code: string | null
          latitude: number | null
          longitude: number | null
          reviews_count: number | null
          reviews_tags: string[] | null
          average_rating: number | null
          photo_url: string | null
          street_view_url: string | null
          working_hours: Json | null
          business_status: string | null
          description: string | null
          reservation_links: string | null
          booking_appointment_link: string | null
          location_link: string | null
          is_active: boolean | null
          is_verified: boolean | null
          is_featured: boolean | null
          source: string | null
          imported_at: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          site?: string | null
          phone?: string | null
          full_address?: string | null
          street?: string | null
          city: string
          postal_code?: string | null
          state?: string | null
          province_code?: string | null
          latitude?: number | null
          longitude?: number | null
          reviews_count?: number | null
          reviews_tags?: string[] | null
          average_rating?: number | null
          photo_url?: string | null
          street_view_url?: string | null
          working_hours?: Json | null
          business_status?: string | null
          description?: string | null
          reservation_links?: string | null
          booking_appointment_link?: string | null
          location_link?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          is_featured?: boolean | null
          source?: string | null
          imported_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          site?: string | null
          phone?: string | null
          full_address?: string | null
          street?: string | null
          city?: string
          postal_code?: string | null
          state?: string | null
          province_code?: string | null
          latitude?: number | null
          longitude?: number | null
          reviews_count?: number | null
          reviews_tags?: string[] | null
          average_rating?: number | null
          photo_url?: string | null
          street_view_url?: string | null
          working_hours?: Json | null
          business_status?: string | null
          description?: string | null
          reservation_links?: string | null
          booking_appointment_link?: string | null
          location_link?: string | null
          is_active?: boolean | null
          is_verified?: boolean | null
          is_featured?: boolean | null
          source?: string | null
          imported_at?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      provinces: {
        Row: {
          code: string
          name: string
          name_fr: string | null
        }
        Insert: {
          code: string
          name: string
          name_fr?: string | null
        }
        Update: {
          code?: string
          name?: string
          name_fr?: string | null
        }
      }
    }
    Views: {
      active_tire_shops: {
        Row: {
          id: string | null
          name: string | null
          slug: string | null
          site: string | null
          phone: string | null
          full_address: string | null
          street: string | null
          city: string | null
          state: string | null
          province_code: string | null
          postal_code: string | null
          latitude: number | null
          longitude: number | null
          reviews_count: number | null
          average_rating: number | null
          photo_url: string | null
          business_status: string | null
          description: string | null
          booking_appointment_link: string | null
          is_featured: boolean | null
          is_verified: boolean | null
          created_at: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
