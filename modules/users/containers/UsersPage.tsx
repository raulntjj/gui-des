import { UserTable } from "../components/UserTable"

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
        <p className="text-gray-600">Gerencie todos os usuários do sistema</p>
      </div>
      <UserTable />
    </div>
  )
}
