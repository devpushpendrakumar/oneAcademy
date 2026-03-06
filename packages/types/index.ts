export type Role = 'LEARNER' | 'MENTOR' | 'CONTENT_MANAGER' | 'SUPER_ADMIN'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  avatar?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface ApiError {
  message: string
  code: string
  statusCode: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
}