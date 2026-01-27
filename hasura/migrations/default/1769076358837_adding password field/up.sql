ALTER TABLE public.parents
ADD COLUMN IF NOT EXISTS password_hash TEXT;
