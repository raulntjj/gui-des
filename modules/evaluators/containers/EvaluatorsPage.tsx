import { UserTable } from "../../users/components/UserTable"

export function EvaluatorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Avaliadores</h1>
        <p className="text-gray-600">Gerencie os avaliadores do sistema</p>
      </div>
      <UserTable role="judge" title="Avaliadores" description="Gerencie os avaliadores do sistema" />
    </div>
  )
}
