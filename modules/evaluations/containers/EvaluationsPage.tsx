"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useTrainings, useDeleteEvaluations } from "../services/queries"
import { ChevronDown, ChevronRight, Users, Calendar, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDate, formatTime } from "@/lib/utils"

export function EvaluationsPage() {
  const [selectedEvaluations, setSelectedEvaluations] = useState<number[]>([])
  const [openTrainings, setOpenTrainings] = useState<Record<number, boolean>>({})

  const { data: trainings, isLoading } = useTrainings()
  const deleteEvaluationsMutation = useDeleteEvaluations()
  const { toast } = useToast()

  const toggleTraining = (trainingId: number) => {
    setOpenTrainings((prev) => ({
      ...prev,
      [trainingId]: !prev[trainingId],
    }))
  }

  const handleEvaluationSelect = (evaluationId: number) => {
    setSelectedEvaluations((prev) =>
      prev.includes(evaluationId) ? prev.filter((id) => id !== evaluationId) : [...prev, evaluationId],
    )
  }

  const handleDeleteSelected = async () => {
    if (selectedEvaluations.length === 0) return

    try {
      await deleteEvaluationsMutation.mutateAsync(selectedEvaluations)
      toast({
        title: "Avaliações removidas com sucesso!",
      })
      setSelectedEvaluations([])
    } catch (error) {
      toast({
        title: "Erro ao remover avaliações",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
          <p className="text-gray-600">Gerencie as avaliações dos treinamentos</p>
        </div>
        {selectedEvaluations.length > 0 && (
          <Button variant="destructive" onClick={handleDeleteSelected} disabled={deleteEvaluationsMutation.isPending}>
            Remover Selecionadas ({selectedEvaluations.length})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Agendamentos</CardTitle>
            <CardDescription>Treinamentos disponíveis para avaliação</CardDescription>
          </CardHeader>
          <CardContent>
            {trainings?.data?.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">Não há agendamentos para serem avaliados.</p>
            ) : (
              <div className="space-y-4">
                {trainings?.data?.map((training: any) => (
                  <Card key={training.id} className="border-l-4 border-l-blue-500">
                    <Collapsible open={openTrainings[training.id]} onOpenChange={() => toggleTraining(training.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {openTrainings[training.id] ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <div>
                                <CardTitle className="text-lg">{training.name}</CardTitle>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(training.date)}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>
                                      {formatTime(training.start_time)} - {formatTime(training.end_time)}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{training.evaluations?.length || 0} avaliações</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{training.modality?.name}</Badge>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          {training.evaluations?.length > 0 ? (
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm text-gray-700 mb-3">Avaliações programadas:</h4>
                              {training.evaluations.map((evaluation: any) => (
                                <div
                                  key={evaluation.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedEvaluations.includes(evaluation.id)}
                                      onChange={() => handleEvaluationSelect(evaluation.id)}
                                      className="rounded"
                                    />
                                    <div>
                                      <p className="font-medium">
                                        {evaluation.participant?.user?.name} {evaluation.participant?.user?.last_name}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Avaliador: {evaluation.judge?.name} {evaluation.judge?.last_name}
                                      </p>
                                    </div>
                                  </div>
                                  <Badge variant="secondary">{evaluation.participant?.category}</Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600 italic">
                              Nenhuma avaliação programada para este treinamento.
                            </p>
                          )}
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
