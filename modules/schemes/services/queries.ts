import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { CreateSchemeData, SchemesResponse, UpdateSchemeData } from "../types"

export const useSchemes = (page = 1, search = "") => {
  return useQuery<SchemesResponse>({
    queryKey: ["schemes", page, search],
    queryFn: async () => {
      const response = await api.get("/evaluation-schemes", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateScheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSchemeData) => {
      const response = await api.post("/evaluation-schemes", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] })
    },
  })
}

export const useUpdateScheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateSchemeData) => {
      const response = await api.put(`/evaluation-schemes/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] })
    },
  })
}

export const useDeleteScheme = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/evaluation-schemes/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schemes"] })
    },
  })
}