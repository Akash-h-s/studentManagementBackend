-- Delete duplicate marks, keeping only the most recent one per student/subject/exam
DELETE FROM marks m1
WHERE m1.id NOT IN (
  SELECT MAX(m2.id)
  FROM marks m2
  GROUP BY m2.student_id, m2.subject_id, m2.exam_id
);

-- Now create the unique constraint
ALTER TABLE marks ADD CONSTRAINT marks_student_subject_exam_key UNIQUE (student_id, subject_id, exam_id);
