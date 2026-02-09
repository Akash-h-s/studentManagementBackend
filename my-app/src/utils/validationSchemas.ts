import Joi from 'joi';

/**
 * Login validation schema
 */
export const loginSchema = Joi.object({
  role: Joi.string()
    .valid('admin', 'teacher', 'parent', 'student')
    .required(),
  identifier: Joi.string().required(),
  password: Joi.string().allow(''),
  studentName: Joi.string().optional(),
});

/**
 * Signup validation schema
 */
export const signupSchema = Joi.object({
  schoolName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});

/**
 * Fetch students validation schema
 */
export const fetchStudentsSchema = Joi.object({
  class_name: Joi.string().required(),
  section_name: Joi.string().required(),
  subject_id: Joi.number().optional(),
  exam_id: Joi.number().optional(),
});

/**
 * Search parents validation schema
 */
export const searchParentsSchema = Joi.object({
  search_query: Joi.string().allow(''),
  current_user_id: Joi.number().optional(),
  current_user_type: Joi.string().valid('teacher', 'parent').optional(),
});

/**
 * Get chats validation schema
 */
export const getChatsSchema = Joi.object({
  user_id: Joi.number().required(),
});

/**
 * Get messages validation schema
 */
export const getMessagesSchema = Joi.object({
  chat_id: Joi.number().required(),
  user_id: Joi.number().optional(),
});

/**
 * Get teacher by email validation schema
 */
export const getTeacherByEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

/**
 * Create chat validation schema
 */
export const createChatSchema = Joi.object({
  type: Joi.string().valid('direct', 'group').required(),
  participants: Joi.when('type', {
    is: 'direct',
    then: Joi.array()
      .items(
        Joi.alternatives().try(
          Joi.object({
            user_id: Joi.number().required(),
            user_type: Joi.string().valid('teacher', 'parent').required(),
          }),
          Joi.number()
        )
      )
      .length(2)
      .required(),
    otherwise: Joi.array().optional(),
  }),
  name: Joi.when('type', {
    is: 'group',
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  created_by: Joi.number().optional(),
  members: Joi.array().optional(),
});

/**
 * Send message validation schema
 */
export const sendMessageSchema = Joi.object({
  chat_id: Joi.number().required(),
  sender_id: Joi.number().required(),
  sender_type: Joi.string().valid('teacher', 'parent').required(),
  content: Joi.string().min(1).required(),
});

/**
 * Marks entry validation schema
 */
export const marksEntrySchema = Joi.object({
  student_id: Joi.number().required(),
  subject_name: Joi.string().required(),
  exam_name: Joi.string().required(),
  class_name: Joi.string().required(),
  section_name: Joi.string().required(),
  academic_year: Joi.string().required(),
  teacher_id: Joi.number().required(),
  marks_obtained: Joi.number().min(0).required(),
  max_marks: Joi.number().min(0).required(),
  grade: Joi.string().optional(),
  remarks: Joi.string().optional(),
  is_finalized: Joi.boolean().required(),
});

/**
 * Upload file validation schema
 */
export const uploadFileSchema = Joi.object({
  type: Joi.string().valid('marks', 'attendance').required(),
  class: Joi.string().required(),
  section: Joi.string().required(),
  filename: Joi.string().required(),
  fileBase64: Joi.string().required(),
});

/**
 * Workflow status validation schema
 */
export const workflowStatusSchema = Joi.object({
  workflowId: Joi.string().required(),
});

/**
 * Validate request body
 */
export const validateRequest = (schema: Joi.Schema, data: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message).join(', ');
    return {
      valid: false,
      error: messages,
      data: null,
    };
  }

  return {
    valid: true,
    error: null,
    data: value,
  };
};
