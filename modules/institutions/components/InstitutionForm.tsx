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
import { useCreateInstitution, useUpdateInstitution } from "../services/queries"
import type { Institution } from "../types"
import { useToast } from "@/hooks/use-toast"

interface InstitutionFormProps {
  institution?: Institution
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InstitutionForm({ institution, open, onOpenChange }: InstitutionFormProps) {
  const [name, setName] = useState(institution?.name || "")
  const [logo, setLogo] = useState<File | null>(null)

  const { toast } = useToast()
  const createMutation = useCreateInstitution()
  const updateMutation = useUpdateInstitution()

  const isEditing = !!institution
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        logo: logo || undefined,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: institution.id })
        toast({
          title: "Instituição atualizada com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Instituição criada com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setLogo(null)
    } catch (error) {
      toast({
        title: "Erro ao salvar instituição",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Instituição" : "Adicionar Instituição"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações da instituição abaixo." : "Preencha as informações da nova instituição."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da instituição *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da instituição"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo da instituição</Label>
              <Input id="logo" type="file" accept="image/*" onChange={(e) => setLogo(e.target.files?.[0] || null)} />
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
