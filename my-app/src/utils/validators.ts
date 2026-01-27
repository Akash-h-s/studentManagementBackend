

// src/utils/validators.ts

interface MarkEntry {
  student_id?: number;
  subject_name?: string;
  exam_name?: string;
  class_name?: string;
  section_name?: string;
  academic_year?: string;
  teacher_id?: number;
  marks_obtained?: number;
  max_marks?: number;
  grade?: string;
  remarks?: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Calculate grade based on percentage
 */
export const calculateGrade = (marks: number, maxMarks: number = 100): string => {
  const percentage = (marks / maxMarks) * 100;

  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

/**
 * Validate individual mark entry
 */
export const validateMarksEntry = (mark: MarkEntry): ValidationResult => {
  const errors: string[] = [];

  // Required fields validation
  if (!mark.class_name?.trim()) {
    errors.push('Class name is required');
  }

  if (!mark.section_name?.trim()) {
    errors.push('Section name is required');
  }

  if (!mark.subject_name?.trim()) {
    errors.push('Subject name is required');
  }

  if (!mark.exam_name?.trim()) {
    errors.push('Exam name is required');
  }

  if (!mark.teacher_id) {
    errors.push('Teacher ID is required');
  }

  if (!mark.student_id) {
    errors.push('Student ID is required');
  }

  if (mark.marks_obtained === undefined || mark.marks_obtained === null) {
    errors.push('Marks obtained is required');
  }

  if (mark.max_marks === undefined || mark.max_marks === null) {
    errors.push('Max marks is required');
  }

  // Marks range validation
  if (mark.marks_obtained !== undefined && mark.marks_obtained < 0) {
    errors.push('Marks cannot be negative');
  }

  if (
    mark.marks_obtained !== undefined &&
    mark.max_marks !== undefined &&
    mark.marks_obtained > mark.max_marks
  ) {
    errors.push(
      `Marks obtained (${mark.marks_obtained}) cannot exceed max marks (${mark.max_marks})`
    );
  }

  if (mark.max_marks !== undefined && mark.max_marks <= 0) {
    errors.push('Max marks must be greater than 0');
  }

  // Grade validation if provided
  if (mark.grade) {
    const validGrades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];
    if (!validGrades.includes(mark.grade)) {
      errors.push(`Invalid grade: ${mark.grade}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};