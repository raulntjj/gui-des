"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateModality, useUpdateModality } from "../services/queries"
import type { Modality } from "../types"
import { useToast } from "@/hooks/use-toast"

interface ModalityFormProps {
  modality?: Modality
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ModalityForm({ modality, open, onOpenChange }: ModalityFormProps) {
  const [name, setName] = useState(modality?.name || "")
  const [description, setDescription] = useState(modality?.description || "")

  const { toast } = useToast()
  const createMutation = useCreateModality()
  const updateMutation = useUpdateModality()

  const isEditing = !!modality
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        description: description || undefined,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: modality.id })
        toast({
          title: "Modalidade atualizada com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Modalidade criada com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setDescription("")
    } catch (error) {
      toast({
        title: "Erro ao salvar modalidade",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Modalidade" : "Adicionar Modalidade"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações da modalidade abaixo." : "Preencha as informações da nova modalidade."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da modalidade *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da modalidade"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição da modalidade"
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
