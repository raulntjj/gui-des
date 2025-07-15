import { InstitutionsTable } from "../components/InstitutionsTable"

export function InstitutionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Instituições</h1>
        <p className="text-gray-600">Gerencie as instituições do sistema</p>
      </div>
      <InstitutionsTable />
    </div>
  )
}
