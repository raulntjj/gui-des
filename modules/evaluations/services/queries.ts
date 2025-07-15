import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { EvaluationsResponse, CreateEvaluationData } from "../types"

export const useEvaluations = (page = 1, search = "") => {
  return useQuery<EvaluationsResponse>({
    queryKey: ["evaluations", page, search],
    queryFn: async () => {
      const response = await api.get("/evaluations", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useTrainings = () => {
  return useQuery({
    queryKey: ["trainings"],
    queryFn: async () => {
      const response = await api.get("/events?search=training")
      return response.data
    },
  })
}

export const useCreateEvaluation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateEvaluationData) => {
      const response = await api.post("/evaluations", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evaluations"] })
      queryClient.invalidateQueries({ queryKey: ["trainings"] })
    },
  })
}

export const useDeleteEvaluations = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (evaluationIds: number[]) => {
      const response = await api.post("/evaluations/bulk", { evaluations: evaluationIds })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evaluations"] })
      queryClient.invalidateQueries({ queryKey: ["trainings"] })
    },
  })
}
