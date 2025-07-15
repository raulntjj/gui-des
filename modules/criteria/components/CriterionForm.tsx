"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCreateCriterion, useUpdateCriterion } from "../services/queries"
import type { Criterion } from "../types"
import { useToast } from "@/hooks/use-toast"

interface CriterionFormProps {
  criterion?: Criterion
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CriterionForm({ criterion, open, onOpenChange }: CriterionFormProps) {
  const [name, setName] = useState(criterion?.name || "")
  const [points, setPoints] = useState(criterion?.points?.toString() || "")

  const { toast } = useToast()
  const createMutation = useCreateCriterion()
  const updateMutation = useUpdateCriterion()

  const isEditing = !!criterion
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        points: points ? Number.parseFloat(points) : undefined,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: criterion.id })
        toast({
          title: "Critério atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Critério criado com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setPoints("")
    } catch (error) {
      toast({
        title: "Erro ao salvar critério",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Critério" : "Adicionar Critério"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do critério abaixo." : "Preencha as informações do novo critério."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do critério *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do critério"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points">Pontuação</Label>
              <Input
                id="points"
                type="number"
                step="0.01"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Pontuação do critério"
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
