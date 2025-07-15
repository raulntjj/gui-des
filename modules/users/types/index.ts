export interface User {
  id: number
  name: string
  last_name: string
  email: string
  role: "admin" | "judge" | "user"
  created_at: string
  updated_at: string
}

export interface CreateUserData {
  name: string
  last_name: string
  email: string
  password: string
  role: string
}

export interface UpdateUserData {
  id: number
  name: string
  last_name: string
  email: string
  role: string
}

export interface UsersResponse {
  data: User[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
