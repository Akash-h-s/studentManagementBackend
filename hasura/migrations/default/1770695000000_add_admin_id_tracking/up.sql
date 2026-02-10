ALTER TABLE teachers ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
ALTER TABLE parents ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
ALTER TABLE students ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
ALTER TABLE subjects ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
ALTER TABLE class_sections ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
ALTER TABLE exams ADD COLUMN created_by_admin_id INTEGER REFERENCES admins(id) ON DELETE SET NULL;
