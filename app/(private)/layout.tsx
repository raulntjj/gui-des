"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth"
import { CustomSidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <CustomSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 px-6 py-2">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
