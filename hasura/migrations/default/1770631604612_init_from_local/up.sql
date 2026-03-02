SET check_function_bodies = false;
CREATE FUNCTION public.update_chat_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE chats SET updated_at = NOW() WHERE id = NEW.chat_id;
    RETURN NEW;
END;
$$;
CREATE TABLE public.admins (
    id integer NOT NULL,
    school_name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    phone text,
    created_at timestamp without time zone DEFAULT now()
);
CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
CREATE TABLE public.bulk_uploads (
    id text NOT NULL,
    admin_id integer NOT NULL,
    total_records integer NOT NULL,
    successful_records integer DEFAULT 0,
    failed_records integer DEFAULT 0,
    status text NOT NULL,
    progress integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT bulk_uploads_progress_check CHECK (((progress >= 0) AND (progress <= 100))),
    CONSTRAINT bulk_uploads_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'completed_with_errors'::text, 'failed'::text])))
);
CREATE TABLE public.chat_participants (
    id integer NOT NULL,
    chat_id integer NOT NULL,
    user_id integer NOT NULL,
    user_type character varying(20) NOT NULL,
    joined_at timestamp without time zone DEFAULT now(),
    CONSTRAINT chat_participants_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['teacher'::character varying, 'parent'::character varying])::text[])))
);
CREATE SEQUENCE public.chat_participants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.chat_participants_id_seq OWNED BY public.chat_participants.id;
CREATE TABLE public.chats (
    id integer NOT NULL,
    type character varying(20) NOT NULL,
    name character varying(255),
    created_by integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT chats_type_check CHECK (((type)::text = ANY ((ARRAY['direct'::character varying, 'group'::character varying])::text[])))
);
CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;
CREATE TABLE public.class_sections (
    id integer NOT NULL,
    class_name text NOT NULL,
    section_name text NOT NULL,
    display_name text GENERATED ALWAYS AS (((class_name || '-'::text) || section_name)) STORED,
    created_at timestamp without time zone DEFAULT now()
);
CREATE SEQUENCE public.class_sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.class_sections_id_seq OWNED BY public.class_sections.id;
CREATE TABLE public.emails (
    id integer NOT NULL,
    student_id integer,
    parent_id integer,
    exam_id integer,
    status text,
    sent_at timestamp without time zone DEFAULT now(),
    CONSTRAINT emails_status_check CHECK ((status = ANY (ARRAY['sent'::text, 'failed'::text])))
);
CREATE SEQUENCE public.emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.emails_id_seq OWNED BY public.emails.id;
CREATE TABLE public.exams (
    id integer NOT NULL,
    name text NOT NULL,
    academic_year text NOT NULL,
    start_date date,
    end_date date
);
CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;
CREATE TABLE public.marks (
    id integer NOT NULL,
    student_id integer,
    subject_id integer,
    exam_id integer,
    teacher_id integer,
    marks_obtained numeric,
    max_marks numeric,
    grade text,
    remarks text,
    is_finalized boolean DEFAULT false,
    entered_at timestamp without time zone DEFAULT now()
);
CREATE SEQUENCE public.marks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.marks_id_seq OWNED BY public.marks.id;
CREATE TABLE public.messages (
    id integer NOT NULL,
    chat_id integer NOT NULL,
    sender_id integer NOT NULL,
    sender_type character varying(20) NOT NULL,
    content text NOT NULL,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    sender_name text,
    CONSTRAINT messages_sender_type_check CHECK (((sender_type)::text = ANY ((ARRAY['teacher'::character varying, 'parent'::character varying])::text[])))
);
CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
CREATE TABLE public.parents (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    address text,
    created_at timestamp without time zone DEFAULT now(),
    password_hash text
);
CREATE SEQUENCE public.parents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.parents_id_seq OWNED BY public.parents.id;
CREATE TABLE public.progress_cards (
    id integer NOT NULL,
    student_id integer,
    exam_id integer,
    total_marks numeric,
    percentage numeric,
    grade text,
    pdf_url text,
    generated_at timestamp without time zone DEFAULT now()
);
CREATE SEQUENCE public.progress_cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.progress_cards_id_seq OWNED BY public.progress_cards.id;
CREATE TABLE public.students (
    id integer NOT NULL,
    admission_no text NOT NULL,
    name text NOT NULL,
    class_section_id integer,
    parent_id integer,
    dob date,
    gender text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    upload_batch_id text,
    admin_id integer
);
CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;
CREATE TABLE public.subjects (
    id integer NOT NULL,
    name text NOT NULL,
    class_name text NOT NULL,
    teacher_id integer
);
CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;
CREATE TABLE public.teachers (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    qualification text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    password_hash text
);
CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;
CREATE TABLE public.uploads (
    id integer NOT NULL,
    type text,
    filename text,
    uploaded_by integer,
    rows_count integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT uploads_type_check CHECK ((type = ANY (ARRAY['student'::text, 'teacher'::text])))
);
CREATE SEQUENCE public.uploads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.uploads_id_seq OWNED BY public.uploads.id;
ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
ALTER TABLE ONLY public.chat_participants ALTER COLUMN id SET DEFAULT nextval('public.chat_participants_id_seq'::regclass);
ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);
ALTER TABLE ONLY public.class_sections ALTER COLUMN id SET DEFAULT nextval('public.class_sections_id_seq'::regclass);
ALTER TABLE ONLY public.emails ALTER COLUMN id SET DEFAULT nextval('public.emails_id_seq'::regclass);
ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);
ALTER TABLE ONLY public.marks ALTER COLUMN id SET DEFAULT nextval('public.marks_id_seq'::regclass);
ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
ALTER TABLE ONLY public.parents ALTER COLUMN id SET DEFAULT nextval('public.parents_id_seq'::regclass);
ALTER TABLE ONLY public.progress_cards ALTER COLUMN id SET DEFAULT nextval('public.progress_cards_id_seq'::regclass);
ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);
ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);
ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);
ALTER TABLE ONLY public.uploads ALTER COLUMN id SET DEFAULT nextval('public.uploads_id_seq'::regclass);
ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);
ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bulk_uploads
    ADD CONSTRAINT bulk_uploads_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_chat_id_user_id_key UNIQUE (chat_id, user_id);
ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.class_sections
    ADD CONSTRAINT class_sections_class_name_section_name_key UNIQUE (class_name, section_name);
ALTER TABLE ONLY public.class_sections
    ADD CONSTRAINT class_sections_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_name_academic_year_key UNIQUE (name, academic_year);
ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_student_subject_exam_key UNIQUE (student_id, subject_id, exam_id);
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_email_key UNIQUE (email);
ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.progress_cards
    ADD CONSTRAINT progress_cards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_admission_no_key UNIQUE (admission_no);
ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_name_class_name_key UNIQUE (name, class_name);
ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_email_key UNIQUE (email);
ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (id);
CREATE INDEX idx_chat_participants_chat ON public.chat_participants USING btree (chat_id);
CREATE INDEX idx_chat_participants_user ON public.chat_participants USING btree (user_id);
CREATE INDEX idx_chats_updated_at ON public.chats USING btree (updated_at DESC);
CREATE INDEX idx_marks_exam ON public.marks USING btree (exam_id);
CREATE INDEX idx_marks_student ON public.marks USING btree (student_id);
CREATE INDEX idx_messages_chat ON public.messages USING btree (chat_id);
CREATE INDEX idx_messages_created_at ON public.messages USING btree (created_at DESC);
CREATE INDEX idx_students_class_section ON public.students USING btree (class_section_id);
CREATE TRIGGER trigger_update_chat_timestamp AFTER INSERT ON public.messages FOR EACH ROW EXECUTE FUNCTION public.update_chat_timestamp();
ALTER TABLE ONLY public.bulk_uploads
    ADD CONSTRAINT bulk_uploads_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.teachers(id);
ALTER TABLE ONLY public.chat_participants
    ADD CONSTRAINT chat_participants_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.teachers(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.parents(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_students_admin FOREIGN KEY (admin_id) REFERENCES public.admins(id);
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.progress_cards
    ADD CONSTRAINT progress_cards_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.progress_cards
    ADD CONSTRAINT progress_cards_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_class_section_id_fkey FOREIGN KEY (class_section_id) REFERENCES public.class_sections(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.parents(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.admins(id) ON DELETE SET NULL;
