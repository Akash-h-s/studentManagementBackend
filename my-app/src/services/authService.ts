import bcrypt from "bcryptjs";
import { gqlSdk } from "../config/graphClient";

export class AuthService {
    static async login(role: string, identifier: string, password?: string, studentName?: string) {
        let user: any = null;
        let isValidPassword = true;

        switch (role) {
            case 'admin': {
                const adminResult = await gqlSdk.GetAdminByEmail({ email: identifier });
                if (adminResult.admins && adminResult.admins.length > 0) {
                    user = adminResult.admins[0];
                    if (password && user.password_hash) {
                        isValidPassword = await bcrypt.compare(password, user.password_hash);
                    } else if (!password) {
                        throw new Error("Password is required for admin login");
                    }
                }
                break;
            }

            case 'teacher': {
                const teacherResult = await gqlSdk.GetTeacherByEmail({ email: identifier });
                if (teacherResult.teachers && teacherResult.teachers.length > 0) {
                    user = teacherResult.teachers[0];
                    if (password && user.password_hash) {
                        isValidPassword = await bcrypt.compare(password, user.password_hash);
                    } else if (!password) {
                        throw new Error("Password is required for teacher login");
                    }
                }
                break;
            }

            case 'parent': {
                const parentResult = await gqlSdk.GetParentByEmail({ email: identifier });
                if (parentResult.parents && parentResult.parents.length > 0) {
                    user = parentResult.parents[0];
                    if (password && user.password_hash) {
                        isValidPassword = await bcrypt.compare(password, user.password_hash);
                    } else if (!password) {
                        throw new Error("Password is required for parent login");
                    }
                }
                break;
            }

            case 'student': {
                const studentResult = await gqlSdk.GetStudentByAdmissionNumber({
                    admissionNumber: identifier,
                    name: studentName || ""
                });
                if (studentResult.students && studentResult.students.length > 0) {
                    user = studentResult.students[0];
                }
                break;
            }

            default:
                throw new Error("Invalid role");
        }

        if (!user) {
            throw new Error(`${role} not found with provided credentials`);
        }

        if (!isValidPassword) {
            throw new Error("Invalid password");
        }

        return {
            id: user.id?.toString() || '',
            name: user.name || user.school_name || '',
            email: user.email || identifier,
            role: role,
            schoolName: user.school_name || user.creator_admin?.school_name || ''
        };
    }
}

