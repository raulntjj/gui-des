import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { CreateTournamentData, TournamentsResponse, UpdateTournamentData } from "../types"

export const useTournaments = (page = 1, search = "") => {
  return useQuery<TournamentsResponse>({
    queryKey: ["tournaments", page, search],
    queryFn: async () => {
      const response = await api.get("/tournaments", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateTournament = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTournamentData) => {
      const response = await api.post("/tournaments", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] })
    },
  })
}

export const useUpdateTournament = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateTournamentData) => {
      const response = await api.put(`/tournaments/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] })
    },
  })
}

export const useDeleteTournament = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tournaments/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] })
    },
  })
}