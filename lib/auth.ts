import { create } from "zustand"
import { persist } from "zustand/middleware"
import { api } from "./api"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await api.post("/login", { email, password })
          const { user, token } = response.data

          localStorage.setItem("auth-token", token)

          set({
            user,
            token,
            isAuthenticated: true,
          })
        } catch (error) {
          throw new Error("Login failed")
        }
      },

      logout: () => {
        localStorage.removeItem("auth-token")
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
