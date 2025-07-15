"use client"

import type React from "react"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser } = useAuthStore()

  useEffect(() => {
    // Verify token on app start
    if (token) {
      // You can add token verification logic here
      // For now, we'll assume the token is valid if it exists
    }
  }, [token, setUser])

  return <>{children}</>
}
