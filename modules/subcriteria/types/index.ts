export interface SubCriterion {
  id: number
  name: string
  description?: string
  points?: number
  criterion_id: number
  criterion: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export interface SubCriteriaResponse {
  data: SubCriterion[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateSubCriterionData {
  name: string
  description?: string
  points?: number
  criterion_id: number
}

export interface UpdateSubCriterionData extends CreateSubCriterionData {
  id: number
}
