import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { InstitutionsResponse, CreateInstitutionData, UpdateInstitutionData } from "../types"

export const useInstitutions = (page = 1, search = "") => {
  return useQuery<InstitutionsResponse>({
    queryKey: ["institutions", page, search],
    queryFn: async () => {
      const response = await api.get("/institutions", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateInstitution = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateInstitutionData) => {
      const formData = new FormData()
      formData.append("name", data.name)
      if (data.logo) {
        formData.append("logo", data.logo)
      }

      const response = await api.post("/institutions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutions"] })
    },
  })
}

export const useUpdateInstitution = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateInstitutionData) => {
      const formData = new FormData()
      formData.append("name", data.name)
      if (data.logo) {
        formData.append("logo", data.logo)
      }

      const response = await api.put(`/institutions/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutions"] })
    },
  })
}

export const useDeleteInstitution = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/institutions/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["institutions"] })
    },
  })
}
