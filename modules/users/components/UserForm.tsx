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
import { useCreateUser, useUpdateUser } from "../services/queries"
import type { User } from "../types"
import { useToast } from "@/hooks/use-toast"

interface UserFormProps {
  user?: User
  open: boolean
  onOpenChange: (open: boolean) => void
  role?: string
}

export function UserForm({ user, open, onOpenChange, role }: UserFormProps) {
  const [name, setName] = useState(user?.name || "")
  const [lastName, setLastName] = useState(user?.last_name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [userRole, setUserRole] = useState(user?.role || role || "user")

  const { toast } = useToast()
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser()

  const isEditing = !!user
  const isLoading = createMutation.isPending || updateMutation.isPending

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = {
        name,
        last_name: lastName,
        email,
        role: userRole,
      }

      if (isEditing) {
        await updateMutation.mutateAsync({ ...data, id: user.id })
        toast({
          title: "Usuário atualizado com sucesso!",
        })
      } else {
        await createMutation.mutateAsync({ ...data, password })
        toast({
          title: "Usuário criado com sucesso!",
        })
      }

      onOpenChange(false)
      setName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setUserRole("user")
    } catch (error) {
      toast({
        title: "Erro ao salvar usuário",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Usuário" : "Adicionar Usuário"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Edite as informações do usuário abaixo." : "Preencha as informações do novo usuário."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Sobrenome *</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sobrenome"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemplo.com"
                required
              />
            </div>
            {!isEditing && (
              <div className="grid gap-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="role">Função *</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="judge">Avaliador</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
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
