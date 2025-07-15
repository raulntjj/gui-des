import { ParticipantTable } from "../components/ParticipantTable"

export function ParticipantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Participantes</h1>
        <p className="text-gray-600">Gerencie os participantes do sistema</p>
      </div>
      <ParticipantTable />
    </div>
  )
}
