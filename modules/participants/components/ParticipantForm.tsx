"use client"

import type React from "react"

import { useState } from "react"
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
import {
  useCreateParticipant,
  useUpdateParticipant,
  useUsers,
  useInstitutions,
  useModalities,
  useTeams,
} from "../services/queries"
import type { Participant } from "../types"
import { useToast } from "@/hooks/use-toast"

interface ParticipantFormProps {
  participant?: Participant
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ParticipantForm({ participant, open, onOpenChange }: ParticipantFormProps) {
  const [userId, setUserId] = useState(participant?.user.id.toString() || "0")
  const [institutionId, setInstitutionId] = useState(participant?.institution?.id.toString() || "0")
  const [modalityId, setModalityId] = useState(participant?.modality.id.toString() || "0")
  const [teamId, setTeamId] = useState(participant?.team?.id.toString() || "0")
  const [category, setCategory] = useState(participant?.category || "Infantil")
  const [position, setPosition] = useState(participant?.position || "")

  const { toast } = useToast()
  const createMutation = useCreateParticipant()
  const updateMutation = useUpdateParticipant()

  const { data: users } = useUsers()
  const { data: institutions } = useInstitutions()
  const { data: modalities } = useModalities()
  const { data: teams } = useTeams()

  const isEditing = !!participant
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        user_id: Number.parseInt(userId),
        institution_id: institutionId ? Number.parseInt(institutionId) : undefined,
        modality_id: Number.parseInt(modalityId),
        team_id: teamId ? Number.parseInt(teamId) : undefined,
        category,
        position: position || undefined,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: participant.id })
        toast({
          title: "Participante atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync(data)
        toast({
          title: "Participante criado com sucesso!",
        })
      }

      onOpenChange(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Erro ao salvar participante",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setUserId("0")
    setInstitutionId("0")
    setModalityId("0")
    setTeamId("0")
    setCategory("Infantil")
    setPosition("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Participante" : "Adicionar Participante"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Edite as informações do participante abaixo."
              : "Preencha as informações do novo participante."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuário *</Label>
              <Select value={userId} onValueChange={setUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o usuário" />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((user: any) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} {user.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="institution">Instituição</Label>
              <Select value={institutionId} onValueChange={setInstitutionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a instituição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nenhuma</SelectItem>
                  {institutions?.map((institution: any) => (
                    <SelectItem key={institution.id} value={institution.id.toString()}>
                      {institution.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="team">Equipe</Label>
              <Select value={teamId} onValueChange={setTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Nenhuma</SelectItem>
                  {teams?.map((team: any) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Infantil">Infantil</SelectItem>
                  <SelectItem value="Juvenil">Juvenil</SelectItem>
                  <SelectItem value="Adulto">Adulto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">Posição</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Posição do participante"
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
