import { gqlSdk } from '../config/graphClient';

export class MarksService {
    static async findOrCreateSubject(name: string, className: string, teacherId: number): Promise<number> {
        const normalized = name.trim().toLowerCase();
        const classNorm = className.trim();
        const findResult = await gqlSdk.FindSubject({ name: normalized, class_name: classNorm });
        if (findResult.subjects.length > 0) return findResult.subjects[0].id;

        const createResult = await gqlSdk.CreateSubject({ name: normalized, class_name: classNorm, teacher_id: teacherId });
        if (!createResult.insert_subjects_one?.id) throw new Error('Subject creation failed');
        return createResult.insert_subjects_one.id;
    }

    static async findOrCreateExam(name: string, year: string): Promise<number> {
        const findResult = await gqlSdk.FindExam({ name: name.trim(), academic_year: year.trim() });
        if (findResult.exams.length > 0) return findResult.exams[0].id;

        const createResult = await gqlSdk.CreateExam({ name: name.trim(), academic_year: year.trim() });
        if (!createResult.insert_exams_one?.id) throw new Error('Exam creation failed');
        return createResult.insert_exams_one.id;
    }

    static async saveMarks(marksObjects: any[]) {
        return await gqlSdk.InsertMarks({ objects: marksObjects });
    }
}
