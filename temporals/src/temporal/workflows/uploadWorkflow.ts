import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const {
  parseExcelFile,
  validateStudentData,
  validateTeacherData,
  createOrGetClassSection,
  insertStudents,
  insertTeachers,
  sendBulkParentEmails,
  sendBulkTeacherEmails,
} = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minutes',
  retry: {
    initialInterval: '1s',
    maximumInterval: '30s',
    maximumAttempts: 3,
  },
});

export interface UploadWorkflowInput {
  type: 'student' | 'teacher';
  fileBase64: string;
  filename: string;
  className?: string;
  section?: string;
  adminId: number;
}

export interface UploadWorkflowResult {
  success: boolean;
  recordsProcessed: number;
  emailsSent: number;
  emailsFailed: number;
  message: string;
}

export async function uploadWorkflow(input: UploadWorkflowInput): Promise<UploadWorkflowResult> {
  console.log(`🚀 Starting ${input.type} upload workflow`);

  // Step 1: Parse Excel
  const rows = await parseExcelFile({
    fileBase64: input.fileBase64,
    filename: input.filename,
  });

  if (input.type === 'student') {
    // Student workflow
    const validatedData = await validateStudentData(rows);

    const classSectionId = await createOrGetClassSection({
      className: input.className!,
      section: input.section!,
      adminId: input.adminId
    });

    const { count, passwords, studentNames } = await insertStudents({
      studentData: validatedData,
      classSectionId,
      adminId: input.adminId
    });

    const emailResults = await sendBulkParentEmails(passwords, studentNames);

    return {
      success: true,
      recordsProcessed: count,
      emailsSent: emailResults.sent,
      emailsFailed: emailResults.failed,
      message: `Successfully processed ${count} students`,
    };

  } else if (input.type === 'teacher') {
    // Teacher workflow
    const validatedData = await validateTeacherData(rows);

    const { count, passwords, teacherNames } = await insertTeachers({
      teacherData: validatedData,
      adminId: input.adminId
    });

    const emailResults = await sendBulkTeacherEmails(passwords, teacherNames);

    return {
      success: true,
      recordsProcessed: count,
      emailsSent: emailResults.sent,
      emailsFailed: emailResults.failed,
      message: `Successfully processed ${count} teachers`,
    };
  }

  throw new Error('Invalid upload type');
}