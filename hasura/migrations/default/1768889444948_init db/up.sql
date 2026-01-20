-- ADMINS TABLE
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  school_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- TEACHERS TABLE
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  qualification TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- PARENTS TABLE
CREATE TABLE parents (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE class_sections (
  id SERIAL PRIMARY KEY,

  class_name TEXT NOT NULL,     
  section_name TEXT NOT NULL,   

  display_name TEXT GENERATED ALWAYS AS 
      (class_name || '-' || section_name) STORED,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(class_name, section_name)
);

-- STUDENTS
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  admission_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,

  class_section_id INTEGER 
      REFERENCES class_sections(id),

  parent_id INTEGER 
      REFERENCES parents(id),

  dob DATE,
  gender TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- SUBJECTS (usually per CLASS not section)
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,

  class_name TEXT NOT NULL,   -- 10,9,8

  teacher_id INTEGER 
      REFERENCES teachers(id)
);

-- EXAMS
CREATE TABLE exams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  start_date DATE,
  end_date DATE
);

-- MARKS
CREATE TABLE marks (
  id SERIAL PRIMARY KEY,

  student_id INTEGER 
      REFERENCES students(id) ON DELETE CASCADE,

  subject_id INTEGER 
      REFERENCES subjects(id) ON DELETE CASCADE,

  exam_id INTEGER 
      REFERENCES exams(id) ON DELETE CASCADE,

  teacher_id INTEGER 
      REFERENCES teachers(id),

  marks_obtained NUMERIC,
  max_marks NUMERIC,

  grade TEXT,
  remarks TEXT,

  entered_at TIMESTAMP DEFAULT NOW(),
  is_finalized BOOLEAN DEFAULT FALSE
);

-- PROGRESS CARDS
CREATE TABLE progress_cards (
  id SERIAL PRIMARY KEY,

  student_id INTEGER 
      REFERENCES students(id) ON DELETE CASCADE,

  exam_id INTEGER 
      REFERENCES exams(id) ON DELETE CASCADE,

  total_marks NUMERIC,
  percentage NUMERIC,
  grade TEXT,

  generated_at TIMESTAMP DEFAULT NOW(),
  pdf_url TEXT
);

-- UPLOAD TRACKING
CREATE TABLE uploads (
  id SERIAL PRIMARY KEY,

  type TEXT CHECK (type IN ('student','teacher')),

  filename TEXT,

  uploaded_by INTEGER 
      REFERENCES admins(id),

  rows_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- EMAIL LOGS
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,

  student_id INTEGER 
      REFERENCES students(id),

  parent_id INTEGER 
      REFERENCES parents(id),

  exam_id INTEGER 
      REFERENCES exams(id),

  status TEXT CHECK (status IN ('sent','failed')),

  sent_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_students_class_section 
  ON students(class_section_id);

CREATE INDEX idx_marks_student 
  ON marks(student_id);

CREATE INDEX idx_marks_exam 
  ON marks(exam_id);

CREATE INDEX idx_marks_subject 
  ON marks(subject_id);
