"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Users, Search, Edit, Trash2 } from "lucide-react"
import { useSchemes, useDeleteScheme } from "../services/queries"
import { SchemeForm } from "../components/SchemeForm"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function SchemesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedScheme, setSelectedScheme] = useState(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data, isLoading, error } = useSchemes(page, search)
  const deleteMutation = useDeleteScheme()
  const { toast } = useToast()

  const handleAdd = () => {
    setSelectedScheme(undefined)
    setIsFormOpen(true)
  }

  const handleEdit = (scheme: any) => {
    setSelectedScheme(scheme)
    setIsFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return

    try {
      await deleteMutation.mutateAsync(deleteId)
      toast({
        title: "Esquema deletado com sucesso!",
      })
      setDeleteId(null)
    } catch (error) {
      toast({
        title: "Erro ao deletar esquema",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "active" ? "default" : "secondary"}>{status === "active" ? "Ativo" : "Inativo"}</Badge>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-600">Erro ao carregar esquemas</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Esquemas de Avaliação</h1>
              <p className="text-gray-600">Gerencie os esquemas e modelos de avaliação</p>
            </div>
            <Button onClick={handleAdd} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              Novo Esquema
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar esquemas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button type="submit">Buscar</Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data?.data?.length === 0 ? (
                    <div className="col-span-full">
                      <p className="text-center py-8 text-muted-foreground">Nenhum esquema encontrado</p>
                    </div>
                  ) : (
                    data?.data?.map((scheme: any) => (
                      <Card key={scheme.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <BookOpen className="h-5 w-5" />
                              <span>{scheme.name}</span>
                            </CardTitle>
                            <div className="flex items-center gap-1">
                              {getStatusBadge(scheme.status)}
                              <Button variant="ghost" size="sm" onClick={() => handleEdit(scheme)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setDeleteId(scheme.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <CardDescription>Modalidade: {scheme.modality?.name || "Não especificada"}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Critérios:</span>
                              <Badge variant="outline">{scheme.criteria_count || 0}</Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>Participantes:</span>
                              </span>
                              <span className="font-medium">{scheme.participants_count || 0}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <SchemeForm scheme={selectedScheme} open={isFormOpen} onOpenChange={setIsFormOpen} />

          <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este esquema? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
