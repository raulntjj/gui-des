export interface Evaluation {
  id: number
  participant: {
    id: number
    user: {
      name: string
      last_name: string
    }
    category: string
  }
  judge: {
    id: number
    name: string
    last_name: string
  }
  event_day: {
    id: number
    index: number
    event: {
      name: string
    }
  }
  modality: {
    id: number
    name: string
  }
  scheme?: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export interface CreateEvaluationData {
  participant_id?: number
  participants?: Array<{
    participant_id: number
    event_day_id: number
    modality_id: number
    judge_id: number
    evaluation_scheme_id?: number
  }>
  event_day_id: number
  modality_id: number
  judge_id: number
  evaluation_scheme_id?: number
}

export interface EvaluationsResponse {
  data: Evaluation[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}
