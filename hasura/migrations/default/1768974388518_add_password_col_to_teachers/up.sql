ALTER TABLE public.teachers
ADD COLUMN IF NOT EXISTS password_hash TEXT;