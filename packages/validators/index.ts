import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export const QuizSubmitSchema = z.object({
  quizId: z.string().uuid(),
  answers: z.array(z.object({
    questionId: z.string().uuid(),
    selectedOptions: z.array(z.string()),
  })),
  timeTaken: z.number().int().positive(),
})

export const AssignmentSubmitSchema = z.object({
  assignmentId: z.string().uuid(),
  submissionType: z.enum(['GITHUB_URL', 'FILE_UPLOAD', 'TEXT']),
  content: z.string().min(1),
  notes: z.string().optional(),
})

export const AssignmentReviewSchema = z.object({
  assignmentSubmissionId: z.string().uuid(),
  rubricScores: z.array(z.object({
    criteriaId: z.string().uuid(),
    score: z.number().int().min(0),
  })),
  feedback: z.string().min(10, 'Please provide detailed feedback'),
  decision: z.enum(['APPROVED', 'REVISION_REQUESTED', 'REJECTED']),
})

export const PaymentCreateSchema = z.object({
  planType: z.enum(['COURSE_ONLY', 'FULL_PACKAGE']),
  courseId: z.string().uuid().optional(),
  paymentMode: z.enum(['FULL', 'EMI']),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
export type QuizSubmitInput = z.infer<typeof QuizSubmitSchema>
export type AssignmentSubmitInput = z.infer<typeof AssignmentSubmitSchema>
export type AssignmentReviewInput = z.infer<typeof AssignmentReviewSchema>
export type PaymentCreateInput = z.infer<typeof PaymentCreateSchema>