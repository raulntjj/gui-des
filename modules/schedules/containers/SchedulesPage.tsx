"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Clock, MapPin } from "lucide-react"

export function SchedulesPage() {
  const schedules = [
    {
      id: 1,
      title: "Treinamento Natação",
      date: "2024-01-15",
      time: "08:00 - 10:00",
      location: "Piscina Olímpica",
      status: "Confirmado",
      participants: 12,
    },
    {
      id: 2,
      title: "Avaliação Ginástica",
      date: "2024-01-16",
      time: "14:00 - 16:00",
      location: "Ginásio Principal",
      status: "Pendente",
      participants: 8,
    },
    {
      id: 3,
      title: "Competição Atletismo",
      date: "2024-01-17",
      time: "09:00 - 12:00",
      location: "Pista de Atletismo",
      status: "Confirmado",
      participants: 25,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      Confirmado: "default",
      Pendente: "secondary",
      Cancelado: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerencie os agendamentos de treinamentos e avaliações</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{schedule.title}</CardTitle>
                  <CardDescription>{schedule.participants} participantes agendados</CardDescription>
                </div>
                {getStatusBadge(schedule.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(schedule.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{schedule.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{schedule.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
