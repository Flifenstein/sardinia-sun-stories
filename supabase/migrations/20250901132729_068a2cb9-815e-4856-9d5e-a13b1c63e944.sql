-- Create places table
CREATE TABLE public.places (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  history TEXT NOT NULL,
  fun_fact TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert existing places data
INSERT INTO public.places (title, type, image_url, history, fun_fact) VALUES
('Alghero', 'Historic City', null, 'Founded by the Genoese in 1102, later ruled by Catalans. Known as ''Little Barcelona'' for its Catalan heritage and architecture.', 'The city walls were built by the Spanish in the 16th century and are still largely intact today.'),
('Costa Smeralda', 'Beach Resort', null, 'Developed in the 1960s by Prince Karim Aga Khan IV as an exclusive resort destination for the international jet set.', 'Building regulations require all structures to blend with the natural landscape - no building can be taller than the surrounding trees.'),
('Su Nuraxi, Barumini', 'Archaeological Site', null, 'Built around 1500 BCE by the Nuragic civilization. This UNESCO World Heritage site represents one of Europe''s finest prehistoric monuments.', 'The central tower originally stood 18-20 meters high and the complex housed up to 200 people.'),
('Cagliari', 'Capital City', null, 'Founded by Phoenicians around 8th century BCE. The historic Castello district preserves medieval and Renaissance architecture.', 'The city''s Poetto beach stretches for 8 kilometers and is one of the longest urban beaches in Europe.'),
('Cala Goloritze', 'Natural Monument', null, 'This pristine beach was formed by a landslide in 1962. Now protected as a natural monument since 1995.', 'The 143-meter limestone spire next to the beach is a popular destination for rock climbers from around the world.'),
('Tharros', 'Ancient Ruins', null, 'Ancient Phoenician city founded in 8th century BCE, later expanded by Romans. Abandoned in 11th century due to Saracen raids.', 'The site contains one of the best-preserved Phoenician tophet (sacred burial grounds) in the Mediterranean.'),
('Orgosolo', 'Mountain Village', null, 'Traditional pastoral village famous for its murals depicting social and political themes, started in the 1960s.', 'The village has over 150 murals painted on building walls, making it an open-air art gallery.'),
('Maddalena Archipelago', 'National Park', null, 'Strategic naval base for centuries. Garibaldi lived in exile on Caprera island from 1855 until his death in 1882.', 'The pink sand beach of Budelli gets its color from microscopic fragments of coral and shells.'),
('Sassari', 'University City', null, 'Free commune in medieval times, later ruled by Pisans and Aragonese. Founded its university in 1562, one of Italy''s oldest.', 'The Cavalcata Sarda festival in May features over 3,000 participants in traditional costumes from across Sardinia.');