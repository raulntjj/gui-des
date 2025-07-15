import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { TeamsResponse, CreateTeamData, UpdateTeamData } from "../types"

export const useTeams = (page = 1, search = "") => {
  return useQuery<TeamsResponse>({
    queryKey: ["teams", page, search],
    queryFn: async () => {
      const response = await api.get("/teams", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTeamData) => {
      const response = await api.post("/teams", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
    },
  })
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateTeamData) => {
      const response = await api.put(`/teams/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
    },
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/teams/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
    },
  })
}

export const useModalities = () => {
  return useQuery({
    queryKey: ["modalities-all"],
    queryFn: async () => {
      const response = await api.get("/modalities?getAll=true")
      return response.data
    },
  })
}
