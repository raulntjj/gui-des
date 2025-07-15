import { ModalitiesTable } from "../components/ModalitiesTable"

export function ModalitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Modalidades</h1>
        <p className="text-gray-600">Gerencie as modalidades esportivas do sistema</p>
      </div>
      <ModalitiesTable />
    </div>
  )
}
