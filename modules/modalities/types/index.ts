export interface Modality {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface CreateModalityData {
  name: string
  description?: string
}

export interface UpdateModalityData extends CreateModalityData {
  id: number
}

export interface ModalitiesResponse {
  data: Modality[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
