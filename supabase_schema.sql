-- ============================================================
-- SKEMA SUPABASE: PORTOFOLIO SANDI PIRDAUS
-- Jalankan skrip ini di SQL Editor dashboard Supabase Anda.
-- ============================================================

-- 1. TABEL PROJECTS (PROYEK)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb, -- contoh: [{"name": "nextjs", "color": "blue-text-gradient"}]
    image_url TEXT NOT NULL,
    source_code_link TEXT DEFAULT '',
    live_demo_link TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL TESTIMONIALS (TESTIMONI KLIEN)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT DEFAULT '',
    designation TEXT DEFAULT 'Klien',
    testimonial TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    image_url TEXT DEFAULT '',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. AKTIFKAN ROW LEVEL SECURITY (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- 4. KEBIJAKAN KEAMANAN (POLICIES) UNTUK TABEL PROJECTS
-- Siapapun (publik) bisa membaca proyek
CREATE POLICY "Public read projects" 
ON public.projects 
FOR SELECT 
USING (true);

-- Hanya user yang sudah login (admin) yang bisa menambah proyek
CREATE POLICY "Admin insert projects" 
ON public.projects 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Hanya user yang sudah login (admin) yang bisa mengupdate proyek
CREATE POLICY "Admin update projects" 
ON public.projects 
FOR UPDATE 
TO authenticated 
USING (true);

-- Hanya user yang sudah login (admin) yang bisa menghapus proyek
CREATE POLICY "Admin delete projects" 
ON public.projects 
FOR DELETE 
TO authenticated 
USING (true);

-- 5. KEBIJAKAN KEAMANAN (POLICIES) UNTUK TABEL TESTIMONIALS
-- Siapapun (publik) hanya bisa membaca testimoni yang berstatus 'approved'
CREATE POLICY "Public read approved testimonials" 
ON public.testimonials 
FOR SELECT 
USING (status = 'approved' OR auth.role() = 'authenticated');

-- Siapapun (klien/publik) bisa mengirim ulasan baru (status otomatis 'pending')
CREATE POLICY "Public insert testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (status = 'pending');

-- Hanya admin yang bisa mengupdate (approve/reject) ulasan
CREATE POLICY "Admin update testimonials" 
ON public.testimonials 
FOR UPDATE 
TO authenticated 
USING (true);

-- Hanya admin yang bisa menghapus ulasan
CREATE POLICY "Admin delete testimonials" 
ON public.testimonials 
FOR DELETE 
TO authenticated 
USING (true);

-- 6. BUAT STORAGE BUCKET UNTUK ASSET PORTOFOLIO (FOTO PROYEK & FOTO KLIEN)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan Storage: Publik bisa melihat semua gambar
CREATE POLICY "Public read storage" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'portfolio-assets');

-- Kebijakan Storage: User authenticated atau anon bisa upload ke bucket
CREATE POLICY "Public and Admin upload storage" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-assets');

-- Kebijakan Storage: Hanya admin yang bisa menghapus file di storage
CREATE POLICY "Admin delete storage" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'portfolio-assets');
