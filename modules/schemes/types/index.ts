export interface Scheme {
  id: number
  name: string
  description?: string
  modality?: {
    id: number
    name: string
  }
  status: string
  criteria_count: number
  participants_count: number
  created_at: string
  updated_at: string
}

export interface SchemesResponse {
  data: Scheme[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateSchemeData {
  name: string
  description?: string
  modality_id?: number
  status?: string
}

export interface UpdateSchemeData extends CreateSchemeData {
  id: number
}