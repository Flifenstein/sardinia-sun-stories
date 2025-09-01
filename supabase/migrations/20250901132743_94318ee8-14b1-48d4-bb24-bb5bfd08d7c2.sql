-- Enable RLS on content_items table
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

-- Create policy for content_items - allow public read access
CREATE POLICY "Public can view active content items" 
ON public.content_items 
FOR SELECT 
USING (is_active = true);

-- Enable RLS on places table  
ALTER TABLE public.places ENABLE ROW LEVEL SECURITY;

-- Create policy for places - allow public read access
CREATE POLICY "Public can view active places" 
ON public.places 
FOR SELECT 
USING (is_active = true);