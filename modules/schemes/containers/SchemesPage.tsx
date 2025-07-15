"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Users } from "lucide-react"

export function SchemesPage() {
  const schemes = [
    {
      id: 1,
      name: "Esquema Natação Livre",
      modality: "Natação",
      criteria: 5,
      participants: 23,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Avaliação Ginástica Artística",
      modality: "Ginástica",
      criteria: 8,
      participants: 15,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Teste Atletismo Velocidade",
      modality: "Atletismo",
      criteria: 4,
      participants: 31,
      status: "Inativo",
    },
  ]

  const getStatusBadge = (status: string) => {
    return <Badge variant={status === "Ativo" ? "default" : "secondary"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Esquemas de Avaliação</h1>
          <p className="text-gray-600">Gerencie os esquemas e modelos de avaliação</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Esquema
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{scheme.name}</span>
                </CardTitle>
                {getStatusBadge(scheme.status)}
              </div>
              <CardDescription>Modalidade: {scheme.modality}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Critérios:</span>
                  <Badge variant="outline">{scheme.criteria}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>Participantes:</span>
                  </span>
                  <span className="font-medium">{scheme.participants}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
