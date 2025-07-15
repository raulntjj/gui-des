export interface Criterion {
  id: number
  name: string
  points?: number
  created_at: string
  updated_at: string
}

export interface CreateCriterionData {
  name: string
  points?: number
}

export interface UpdateCriterionData extends CreateCriterionData {
  id: number
}

export interface CriteriaResponse {
  data: Criterion[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
