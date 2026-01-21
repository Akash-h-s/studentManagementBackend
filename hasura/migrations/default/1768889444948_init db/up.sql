--- 1. Independent Tables (No Foreign Keys)
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    school_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    qualification TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE exams (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    start_date DATE,
    end_date DATE
);

--- 2. Tables with Dependencies
CREATE TABLE class_sections (
    id SERIAL PRIMARY KEY,
    class_name TEXT NOT NULL,
    section_name TEXT NOT NULL,
    display_name TEXT GENERATED ALWAYS AS (class_name || '-' || section_name) STORED,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(class_name, section_name) -- Critical for Upserting
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    admission_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class_section_id INTEGER REFERENCES class_sections(id) ON DELETE SET NULL,
    parent_id INTEGER REFERENCES parents(id) ON DELETE SET NULL,
    dob DATE,
    gender TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    class_name TEXT NOT NULL,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    subject_id INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
    marks_obtained NUMERIC,
    max_marks NUMERIC,
    grade TEXT,
    remarks TEXT,
    is_finalized BOOLEAN DEFAULT FALSE,
    entered_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress_cards (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    total_marks NUMERIC,
    percentage NUMERIC,
    grade TEXT,
    pdf_url TEXT,
    generated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE uploads (
    id SERIAL PRIMARY KEY,
    type TEXT CHECK (type IN ('student','teacher')),
    filename TEXT,
    uploaded_by INTEGER REFERENCES admins(id) ON DELETE SET NULL,
    rows_count INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE emails (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES parents(id) ON DELETE CASCADE,
    exam_id INTEGER REFERENCES exams(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('sent','failed')),
    sent_at TIMESTAMP DEFAULT NOW()
);

--- 3. Indexes for Performance
CREATE INDEX idx_students_class_section ON students(class_section_id);
CREATE INDEX idx_marks_student ON marks(student_id);
CREATE INDEX idx_marks_exam ON marks(exam_id);