import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { CreateScheduleData, SchedulesResponse, UpdateScheduleData } from "../types"

export const useSchedules = (page = 1, search = "") => {
  return useQuery<SchedulesResponse>({
    queryKey: ["schedules", page, search],
    queryFn: async () => {
      const response = await api.get("/events", {
        params: { page, search, perPage: 10 },
      })
      return response.data
    },
  })
}

export const useCreateSchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateScheduleData) => {
      const response = await api.post("/events", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
    },
  })
}

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateScheduleData) => {
      const response = await api.put(`/events/${data.id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
    },
  })
}

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/events/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
    },
  })
}