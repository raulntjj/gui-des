"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateTournament, useUpdateTournament } from "../services/queries"
import { formatDateForInput } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface TournamentFormProps {
  tournament?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TournamentForm({ tournament, open, onOpenChange }: TournamentFormProps) {
  const [name, setName] = useState(tournament?.name || "")
  const [description, setDescription] = useState(tournament?.description || "")
  const [startDate, setStartDate] = useState(formatDateForInput(tournament?.start_date) || "")
  const [endDate, setEndDate] = useState(formatDateForInput(tournament?.end_date) || "")
  const [status, setStatus] = useState(tournament?.status || "upcoming")

  const { toast } = useToast()
  const createMutation = useCreateTournament()
  const updateMutation = useUpdateTournament()

  const isEditing = !!tournament
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        description: description || undefined,
        start_date: startDate,
        end_date: endDate,
        status,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: tournament.id })
        toast({
          title: "Torneio atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Torneio criado com sucesso!",
        })
      }

      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Erro ao salvar torneio",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setStatus("upcoming")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Torneio" : "Adicionar Torneio"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do torneio abaixo." : "Preencha as informações do novo torneio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do torneio *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do torneio"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do torneio"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Data início *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Data fim *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Próximo</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
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