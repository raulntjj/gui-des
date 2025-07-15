import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ModalitiesResponse, CreateModalityData, UpdateModalityData } from "../types"

export const useModalities = (page = 1, search = "") => {
  return useQuery<ModalitiesResponse>({
    queryKey: ["modalities", page, search],
    queryFn: async () => {
      const response = await api.get("/modalities", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateModality = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateModalityData) => {
      const response = await api.post("/modalities", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modalities"] })
    },
  })
}

export const useUpdateModality = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateModalityData) => {
      const response = await api.put(`/modalities/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modalities"] })
    },
  })
}

export const useDeleteModality = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/modalities/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modalities"] })
    },
  })
}
