import {
  Home,
  Users,
  UserCheck,
  Building,
  Trophy,
  Calendar,
  Target,
  ClipboardList,
  FileText,
  Award,
  BookOpen,
  Layers,
  UsersIcon,
  School,
} from "lucide-react"

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Usuários",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Participantes",
    href: "/dashboard/participants",
    icon: UserCheck,
  },
  {
    title: "Avaliadores",
    href: "/dashboard/evaluators",
    icon: UsersIcon,
  },
  {
    title: "Instituições",
    href: "/dashboard/institutions",
    icon: Building,
  },
  {
    title: "Modalidades",
    href: "/dashboard/modalities",
    icon: Trophy,
  },
  {
    title: "Equipes",
    href: "/dashboard/teams",
    icon: School,
  },
  {
    title: "Torneios",
    href: "/dashboard/tournaments",
    icon: Award,
  },
  {
    title: "Agendamentos",
    href: "/dashboard/schedules",
    icon: Calendar,
  },
  {
    title: "Avaliações",
    href: "/dashboard/evaluations",
    icon: Target,
  },
  {
    title: "Critérios",
    href: "/dashboard/criteria",
    icon: ClipboardList,
  },
  {
    title: "Subcritérios",
    href: "/dashboard/subcriteria",
    icon: Layers,
  },
  {
    title: "Itens",
    href: "/dashboard/items",
    icon: FileText,
  },
  {
    title: "Esquemas",
    href: "/dashboard/schemes",
    icon: BookOpen,
  },
]
