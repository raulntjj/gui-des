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
import { useCreateItem, useUpdateItem, useCriteria } from "../services/queries"
import type { Item } from "../types"
import { useToast } from "@/hooks/use-toast"

interface ItemFormProps {
  item?: Item
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ItemForm({ item, open, onOpenChange }: ItemFormProps) {
  const [name, setName] = useState(item?.name || "")
  const [description, setDescription] = useState(item?.description || "")
  const [points, setPoints] = useState(item?.points?.toString() || "")
  const [criterionId, setCriterionId] = useState(item?.criterion_id.toString() || "0")

  const { toast } = useToast()
  const createMutation = useCreateItem()
  const updateMutation = useUpdateItem()
  const { data: criteria } = useCriteria()

  const isEditing = !!item
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        description: description || undefined,
        points: points ? Number.parseFloat(points) : undefined,
        criterion_id: Number.parseInt(criterionId),
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: item.id })
        toast({
          title: "Item atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Item criado com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setDescription("")
      setPoints("")
      setCriterionId("0")
    } catch (error) {
      toast({
        title: "Erro ao salvar item",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Item" : "Adicionar Item"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do item abaixo." : "Preencha as informações do novo item."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do item *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do item"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="criterion">Critério *</Label>
              <Select value={criterionId} onValueChange={setCriterionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o critério" />
                </SelectTrigger>
                <SelectContent>
                  {criteria?.map((criterion: any) => (
                    <SelectItem key={criterion.id} value={criterion.id.toString()}>
                      {criterion.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="points">Pontuação</Label>
              <Input
                id="points"
                type="number"
                step="0.01"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Pontuação do item"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do item"
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
