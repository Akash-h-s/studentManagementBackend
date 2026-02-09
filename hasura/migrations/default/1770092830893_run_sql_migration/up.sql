ALTER TABLE students ADD COLUMN IF NOT EXISTS admin_id INTEGER;
ALTER TABLE students 
ADD CONSTRAINT fk_students_admin 
FOREIGN KEY (admin_id) REFERENCES admins(id);
