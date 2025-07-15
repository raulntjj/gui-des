export interface Participant {
  id: number
  user: {
    id: number
    name: string
    last_name: string
    email: string
  }
  institution?: {
    id: number
    name: string
  }
  modality: {
    id: number
    name: string
  }
  team?: {
    id: number
    name: string
  }
  category: string
  position?: string
  created_at: string
  updated_at: string
}

export interface CreateParticipantData {
  user_id: number
  institution_id?: number
  modality_id: number
  team_id?: number
  category: string
  position?: string
}

export interface UpdateParticipantData extends CreateParticipantData {
  id: number
}

export interface ParticipantsResponse {
  data: Participant[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
