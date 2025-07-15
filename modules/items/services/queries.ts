import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ItemsResponse, CreateItemData, UpdateItemData } from "../types"

export const useItems = (page = 1, search = "") => {
  return useQuery<ItemsResponse>({
    queryKey: ["items", page, search],
    queryFn: async () => {
      const response = await api.get("/items", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateItemData) => {
      const response = await api.post("/items", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateItemData) => {
      const response = await api.put(`/items/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/items/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export const useCriteria = () => {
  return useQuery({
    queryKey: ["criteria-all"],
    queryFn: async () => {
      const response = await api.get("/criteria?getAll=true")
      return response.data
    },
  })
}
