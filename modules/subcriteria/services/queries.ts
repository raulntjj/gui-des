import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { SubCriteriaResponse, CreateSubCriterionData, UpdateSubCriterionData } from "../types"

export const useSubCriteria = (page = 1, search = "") => {
  return useQuery<SubCriteriaResponse>({
    queryKey: ["subcriteria", page, search],
    queryFn: async () => {
      const response = await api.get("/subcriteria", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateSubCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSubCriterionData) => {
      const response = await api.post("/subcriteria", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcriteria"] })
    },
  })
}

export const useUpdateSubCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateSubCriterionData) => {
      const response = await api.put(`/subcriteria/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcriteria"] })
    },
  })
}

export const useDeleteSubCriterion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/subcriteria/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcriteria"] })
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
