// temporals/src/temporal/activities/emailActivities.ts
import Mailgun from "mailgun.js";
import formData from "form-data";

const MAILGUN_API_KEY = "updated in env";
const MAILGUN_DOMAIN = "updated in env";

let mg: any = null;
let domain = '';

if (MAILGUN_API_KEY && MAILGUN_DOMAIN) {
  const mailgun = new Mailgun(formData);
  mg = mailgun.client({
    username: 'api',
    key: MAILGUN_API_KEY,
  });
  domain = MAILGUN_DOMAIN;
  console.log('✅ Mailgun client initialized');
} else {
  console.warn('⚠️ Mailgun not configured, emails will be skipped');
}

export interface EmailInput {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail(input: EmailInput): Promise<{ success: boolean; email: string }> {
  if (!mg || !domain) {
    console.log(`⏭️ Skipping email to ${input.to}`);
    return { success: false, email: input.to };
  }

  try {
    await mg.messages.create(domain, {
      from: `School Management <postmaster@${domain}>`,
      to: [input.to],
      subject: input.subject,
      text: input.text,
    });

    console.log(`✅ Email sent to ${input.to}`);
    return { success: true, email: input.to };
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${input.to}:`, error.message);
    return { success: false, email: input.to };
  }
}

// ✅ use Record<string,string> instead of Map
export async function sendBulkParentEmails(
  passwords: Record<string, string>,
  studentNames: Record<string, string>
): Promise<{ sent: number; failed: number }> {
  console.log(`📧 Sending ${Object.keys(passwords).length} parent emails...`);

  let sent = 0, failed = 0;

  for (const email in passwords) {
    const password = passwords[email];
    const studentName = studentNames[email] || "Student";

    const result = await sendEmail({
      to: email,
      subject: "Parent Portal Access",
      text: `Hello! Student ${studentName} has been registered. Your password is: ${password}`,
    });

    result.success ? sent++ : failed++;
  }

  return { sent, failed };
}

// ✅ use Record<string,string> instead of Map
export async function sendBulkTeacherEmails(
  passwords: Record<string, string>,
  teacherNames: Record<string, string>
): Promise<{ sent: number; failed: number }> {
  console.log(`📧 Sending ${Object.keys(passwords).length} teacher emails...`);

  let sent = 0, failed = 0;

  for (const email in passwords) {
    const password = passwords[email];
    const teacherName = teacherNames[email] || "Teacher";

    const result = await sendEmail({
      to: email,
      subject: "Teacher Portal Access",
      text: `Hello ${teacherName}! You've been registered as a teacher. Your password is: ${password}`,
    });

    result.success ? sent++ : failed++;
  }

  return { sent, failed };
}
