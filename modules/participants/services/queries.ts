import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { ParticipantsResponse, CreateParticipantData, UpdateParticipantData } from "../types"

export const useParticipants = (page = 1, search = "") => {
  return useQuery<ParticipantsResponse>({
    queryKey: ["participants", page, search],
    queryFn: async () => {
      const response = await api.get("/participants", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateParticipant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateParticipantData) => {
      const response = await api.post("/participants", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] })
    },
  })
}

export const useUpdateParticipant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateParticipantData) => {
      const response = await api.put(`/participants/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] })
    },
  })
}

export const useDeleteParticipant = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/participants/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] })
    },
  })
}

// Helper queries for form data
export const useUsers = () => {
  return useQuery({
    queryKey: ["users-all"],
    queryFn: async () => {
      const response = await api.get("/users?getAll=true")
      return response.data
    },
  })
}

export const useInstitutions = () => {
  return useQuery({
    queryKey: ["institutions-all"],
    queryFn: async () => {
      const response = await api.get("/institutions?getAll=true")
      return response.data
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

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams-all"],
    queryFn: async () => {
      const response = await api.get("/teams?getAll=true")
      return response.data
    },
  })
}
