export interface MarkEntryRequest {
    student_id: number;
    subject_name: string;
    exam_name: string;
    class_name: string;
    section_name: string;
    academic_year: string;
    teacher_id: number;
    marks_obtained: number;
    max_marks: number;
    grade?: string;
    remarks?: string;
    is_finalized: boolean;
}

export const validateMarksEntry = (entry: MarkEntryRequest) => {
    const errors: string[] = [];
    if (entry.marks_obtained > entry.max_marks) {
        errors.push('Marks obtained cannot be greater than maximum marks');
    }
    if (entry.marks_obtained < 0) {
        errors.push('Marks cannot be negative');
    }
    return {
        valid: errors.length === 0,
        errors
    };
};
