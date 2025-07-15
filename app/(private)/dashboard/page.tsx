"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Calendar, Target } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total de Usuários",
      value: "1,234",
      description: "Usuários cadastrados no sistema",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Avaliações Ativas",
      value: "56",
      description: "Avaliações em andamento",
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Torneios",
      value: "12",
      description: "Torneios programados",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      title: "Eventos",
      value: "89",
      description: "Eventos cadastrados",
      icon: Calendar,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bem-vindo ao sistema de gestão de avaliações esportivas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas atividades do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nova avaliação criada</p>
                  <p className="text-xs text-gray-500">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Usuário cadastrado</p>
                  <p className="text-xs text-gray-500">Há 4 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Torneio atualizado</p>
                  <p className="text-xs text-gray-500">Há 6 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Eventos programados para os próximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Campeonato Regional</p>
                  <p className="text-xs text-gray-500">15 de Janeiro</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Em breve</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Torneio Juvenil</p>
                  <p className="text-xs text-gray-500">22 de Janeiro</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Confirmado</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Copa Estadual</p>
                  <p className="text-xs text-gray-500">30 de Janeiro</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Planejando</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
