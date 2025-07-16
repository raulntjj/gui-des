export interface Schedule {
  id: number
  name: string
  date: string
  start_time: string
  end_time: string
  location?: string
  status: string
  participants_count: number
  modality?: {
    id: number
    name: string
  }
  created_at: string
  updated_at: string
}

export interface SchedulesResponse {
  data: Schedule[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateScheduleData {
  name: string
  date: string
  start_time: string
  end_time: string
  location?: string
  modality_id?: number
  status?: string
}

export interface UpdateScheduleData extends CreateScheduleData {
  id: number
}