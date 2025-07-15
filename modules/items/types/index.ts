export interface Item {
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

export interface ItemsResponse {
  data: Item[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface CreateItemData {
  name: string
  description?: string
  points?: number
  criterion_id: number
}

export interface UpdateItemData extends CreateItemData {
  id: number
}
