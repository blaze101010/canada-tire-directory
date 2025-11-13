-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    reviewer_name VARCHAR(100) NOT NULL,
    reviewer_email VARCHAR(255),
    title VARCHAR(200),
    comment TEXT NOT NULL,
    service_type VARCHAR(100),
    visit_date DATE,
    would_recommend BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON public.reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews(is_approved);

-- Create a function to update the listings table with average rating and review count
CREATE OR REPLACE FUNCTION update_listing_ratings()
RETURNS TRIGGER AS $$
DECLARE
    target_listing_id UUID;
BEGIN
    -- Get the listing_id from either NEW or OLD record
    IF TG_OP = 'DELETE' THEN
        target_listing_id := OLD.listing_id;
    ELSE
        target_listing_id := NEW.listing_id;
    END IF;

    -- Update the listings table with new average rating and count
    UPDATE public.listings
    SET
        average_rating = (
            SELECT AVG(rating)::NUMERIC(3,2)
            FROM public.reviews
            WHERE listing_id = target_listing_id
            AND is_approved = true
        ),
        reviews_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE listing_id = target_listing_id
            AND is_approved = true
        ),
        updated_at = NOW()
    WHERE id = target_listing_id;

    IF TG_OP = 'DELETE' THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update listing ratings
DROP TRIGGER IF EXISTS trigger_update_listing_ratings ON public.reviews;
CREATE TRIGGER trigger_update_listing_ratings
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_listing_ratings();

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read approved reviews
CREATE POLICY "Allow read access to approved reviews" ON public.reviews
    FOR SELECT
    USING (is_approved = true);

-- Create policy to allow anyone to insert reviews (they'll need approval)
CREATE POLICY "Allow insert access for reviews" ON public.reviews
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow users to update their own reviews (if we track user_id in the future)
-- For now, only admins can update reviews through direct database access

COMMENT ON TABLE public.reviews IS 'Customer reviews and ratings for tire shops';
COMMENT ON COLUMN public.reviews.listing_id IS 'Reference to the tire shop listing';
COMMENT ON COLUMN public.reviews.rating IS 'Rating from 1 to 5 stars';
COMMENT ON COLUMN public.reviews.reviewer_name IS 'Name of the person leaving the review';
COMMENT ON COLUMN public.reviews.reviewer_email IS 'Email of reviewer (not displayed publicly)';
COMMENT ON COLUMN public.reviews.title IS 'Optional title for the review';
COMMENT ON COLUMN public.reviews.comment IS 'The review text content';
COMMENT ON COLUMN public.reviews.service_type IS 'Type of service received (e.g., Tire Installation, Oil Change)';
COMMENT ON COLUMN public.reviews.visit_date IS 'Date when the customer visited the shop';
COMMENT ON COLUMN public.reviews.would_recommend IS 'Whether the reviewer would recommend this shop';
COMMENT ON COLUMN public.reviews.is_verified IS 'Whether this is a verified purchase/visit';
COMMENT ON COLUMN public.reviews.is_approved IS 'Whether the review has been approved by moderators';
COMMENT ON COLUMN public.reviews.helpful_count IS 'Number of users who found this review helpful';
