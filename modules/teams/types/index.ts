export interface Team {
  id: number
  name: string
  description?: string
  modality_id: number
  modality: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export interface TeamsResponse {
  data: Team[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateTeamData {
  name: string
  description?: string
  modality_id: number
}

export interface UpdateTeamData extends CreateTeamData {
  id: number
}
