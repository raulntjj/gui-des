import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { CriteriaResponse, CreateCriterionData, UpdateCriterionData } from "../types"

export const useCriteria = (page = 1, search = "") => {
  return useQuery<CriteriaResponse>({
    queryKey: ["criteria", page, search],
    queryFn: async () => {
      const response = await api.get("/criteria", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCriterionData) => {
      const response = await api.post("/criteria", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] })
    },
  })
}

export const useUpdateCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateCriterionData) => {
      const response = await api.put(`/criteria/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] })
    },
  })
}

export const useDeleteCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/criteria/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["criteria"] })
    },
  })
}
