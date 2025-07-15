export interface Institution {
  id: number
  name: string
  logo?: string
  created_at: string
  updated_at: string
}

export interface CreateInstitutionData {
  name: string
  logo?: File
}

export interface UpdateInstitutionData {
  id: number
  name: string
  logo?: File
}

export interface InstitutionsResponse {
  data: Institution[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
