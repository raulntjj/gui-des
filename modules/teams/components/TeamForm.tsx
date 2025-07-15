"use client"

import type React from "react"

import { useState } from "react"
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
import { useCreateTeam, useUpdateTeam, useModalities } from "../services/queries"
import type { Team } from "../types"
import { useToast } from "@/hooks/use-toast"

interface TeamFormProps {
  team?: Team
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TeamForm({ team, open, onOpenChange }: TeamFormProps) {
  const [name, setName] = useState(team?.name || "")
  const [description, setDescription] = useState(team?.description || "")
  const [modalityId, setModalityId] = useState(team?.modality_id.toString() || "0")

  const { toast } = useToast()
  const createMutation = useCreateTeam()
  const updateMutation = useUpdateTeam()
  const { data: modalities } = useModalities()

  const isEditing = !!team
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        description: description || undefined,
        modality_id: Number.parseInt(modalityId),
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: team.id })
        toast({
          title: "Equipe atualizada com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Equipe criada com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setDescription("")
      setModalityId("0")
    } catch (error) {
      toast({
        title: "Erro ao salvar equipe",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Equipe" : "Adicionar Equipe"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações da equipe abaixo." : "Preencha as informações da nova equipe."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da equipe *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da equipe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="modality">Modalidade *</Label>
              <Select value={modalityId} onValueChange={setModalityId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a modalidade" />
                </SelectTrigger>
                <SelectContent>
                  {modalities?.map((modality: any) => (
                    <SelectItem key={modality.id} value={modality.id.toString()}>
                      {modality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da equipe"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
