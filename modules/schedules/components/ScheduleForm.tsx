"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateSchedule, useUpdateSchedule } from "../services/queries"
import { useModalities } from "../../modalities/services/queries"
import { formatDateForInput, formatTimeForInput } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ScheduleFormProps {
  schedule?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleForm({ schedule, open, onOpenChange }: ScheduleFormProps) {
  const [name, setName] = useState(schedule?.name || "")
  const [date, setDate] = useState(formatDateForInput(schedule?.date) || "")
  const [startTime, setStartTime] = useState(formatTimeForInput(schedule?.start_time) || "")
  const [endTime, setEndTime] = useState(formatTimeForInput(schedule?.end_time) || "")
  const [location, setLocation] = useState(schedule?.location || "")
  const [modalityId, setModalityId] = useState(schedule?.modality?.id?.toString() || "")
  const [status, setStatus] = useState(schedule?.status || "pending")

  const { toast } = useToast()
  const createMutation = useCreateSchedule()
  const updateMutation = useUpdateSchedule()
  const { data: modalities } = useModalities()

  const isEditing = !!schedule
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        date,
        start_time: startTime,
        end_time: endTime,
        location: location || undefined,
        modality_id: modalityId ? parseInt(modalityId) : undefined,
        status,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: schedule.id })
        toast({
          title: "Agendamento atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Agendamento criado com sucesso!",
        })
      }

      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Erro ao salvar agendamento",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setName("")
    setDate("")
    setStartTime("")
    setEndTime("")
    setLocation("")
    setModalityId("")
    setStatus("pending")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Agendamento" : "Adicionar Agendamento"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do agendamento abaixo." : "Preencha as informações do novo agendamento."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do evento *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do evento"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Hora início *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">Hora fim *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Local do evento"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="modality">Modalidade</Label>
              <Select value={modalityId} onValueChange={setModalityId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma</SelectItem>
                  {modalities?.data?.map((modality: any) => (
                    <SelectItem key={modality.id} value={modality.id.toString()}>
                      {modality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="confirmed">Confirmado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600">
              {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}