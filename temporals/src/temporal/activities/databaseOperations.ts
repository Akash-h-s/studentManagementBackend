import bcrypt from "bcryptjs";
import { gqlSdk } from "../../config/graphClient";

const generatePassword = () => Math.random().toString(36).slice(-8);

export interface ClassSectionInput {
  className: string;
  section: string;
}

// ✅ Return number instead of string
export async function createOrGetClassSection(input: ClassSectionInput): Promise<number> {
  console.log(`📚 Creating/Getting class section: ${input.className}-${input.section}`);

  const sectionRes = await gqlSdk.InsertClassSection({
    object: { class_name: input.className, section_name: input.section }
  });

  const classSectionId = sectionRes.insert_class_sections_one?.id;
  if (!classSectionId) {
    throw new Error("Failed to resolve Class/Section");
  }

  console.log(`✅ Class section ID: ${classSectionId}`);
  return classSectionId;
}

export interface StudentInsertInput {
  studentData: any[];
  classSectionId: number;
}

export async function insertStudents(input: StudentInsertInput): Promise<{
  count: number;
  passwords: Record<string, string>;
  studentNames: Record<string, string>;
}> {
  console.log(`💾 Inserting ${input.studentData.length} students into database...`);

  const passwords: Record<string, string> = {};
  const studentNames: Record<string, string> = {};

  const studentData = await Promise.all(
    input.studentData.map(async (student) => {
      const rawPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      if (student.parentEmail) {
        passwords[student.parentEmail] = rawPassword;
        studentNames[student.parentEmail] = student.studentName;
      }

      return {
        admission_no: student.admissionNo,
        name: student.studentName,
        gender: student.gender,
        dob: student.dob,
        class_section_id: input.classSectionId,
        parent: {
          data: {
            name: student.parentName,
            email: student.parentEmail || null,
            password_hash: hashedPassword,
          },
        },
      };
    })
  );

  await gqlSdk.InsertStudents({ list: studentData });

  console.log(`✅ Inserted ${studentData.length} students`);
  return {
    count: studentData.length,
    passwords,
    studentNames,
  };
}

export async function insertTeachers(teacherData: any[]): Promise<{
  count: number;
  passwords: Record<string, string>;
  teacherNames: Record<string, string>;
}> {
  console.log(`💾 Inserting ${teacherData.length} teachers into database...`);

  const passwords: Record<string, string> = {};
  const teacherNames: Record<string, string> = {};

  const data = await Promise.all(
    teacherData.map(async (teacher) => {
      const rawPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(rawPassword, 10);

      if (teacher.email) {
        passwords[teacher.email] = rawPassword;
        teacherNames[teacher.email] = teacher.name;
      }

      return {
        name: teacher.name,
        email: teacher.email || null,
        phone: teacher.phone,
        qualification: teacher.qualification,
        password_hash: hashedPassword,
      };
    })
  );

  await gqlSdk.InsertTeachers({ list: data });

  console.log(`✅ Inserted ${data.length} teachers`);
  return {
    count: data.length,
    passwords,
    teacherNames,
  };
}
