import { CriteriaTable } from "../components/CriteriaTable"

export function CriteriaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Critérios</h1>
        <p className="text-gray-600">Gerencie os critérios de avaliação do sistema</p>
      </div>
      <CriteriaTable />
    </div>
  )
}
