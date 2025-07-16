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
import { useCreateScheme, useUpdateScheme } from "../services/queries"
import { useModalities } from "../../modalities/services/queries"
import { useToast } from "@/hooks/use-toast"

interface SchemeFormProps {
  scheme?: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SchemeForm({ scheme, open, onOpenChange }: SchemeFormProps) {
  const [name, setName] = useState(scheme?.name || "")
  const [description, setDescription] = useState(scheme?.description || "")
  const [modalityId, setModalityId] = useState(scheme?.modality?.id?.toString() || "")
  const [status, setStatus] = useState(scheme?.status || "active")

  const { toast } = useToast()
  const createMutation = useCreateScheme()
  const updateMutation = useUpdateScheme()
  const { data: modalities } = useModalities()

  const isEditing = !!scheme
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        description: description || undefined,
        modality_id: modalityId ? parseInt(modalityId) : undefined,
        status,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: scheme.id })
        toast({
          title: "Esquema atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Esquema criado com sucesso!",
        })
      }

      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Erro ao salvar esquema",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setName("")
    setDescription("")
    setModalityId("")
    setStatus("active")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Esquema" : "Adicionar Esquema"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do esquema abaixo." : "Preencha as informações do novo esquema."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do esquema *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do esquema"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do esquema"
                rows={3}
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
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
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