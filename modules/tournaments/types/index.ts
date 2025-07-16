export interface Tournament {
  id: number
  name: string
  description?: string
  start_date: string
  end_date: string
  status: string
  participants_count: number
  created_at: string
  updated_at: string
}

export interface TournamentsResponse {
  data: Tournament[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateTournamentData {
  name: string
  description?: string
  start_date: string
  end_date: string
  status?: string
}

export interface UpdateTournamentData extends CreateTournamentData {
  id: number
}