"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trophy, Calendar, Users } from "lucide-react"

export function TournamentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Torneios</h1>
          <p className="text-gray-600">Gerencie os torneios e competições</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Torneio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Campeonato Regional</CardTitle>
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <CardDescription>Competição regional de múltiplas modalidades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>15 - 20 de Janeiro, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>156 participantes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Copa Juvenil</CardTitle>
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
            <CardDescription>Torneio exclusivo para categoria juvenil</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>22 - 25 de Janeiro, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>89 participantes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Torneio Estadual</CardTitle>
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <CardDescription>Grande competição estadual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>30 Jan - 5 Fev, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>234 participantes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
