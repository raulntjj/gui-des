import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return "-"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return "-"

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj)
  } catch (error) {
    return "-"
  }
}

export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return "-"

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return "-"

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj)
  } catch (error) {
    return "-"
  }
}

export function formatTime(time: string | null | undefined) {
  if (!time) return "-"

  try {
    if (time.includes(":")) {
      const [hours, minutes] = time.split(":")
      return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
    }
    return time
  } catch (error) {
    return "-"
  }
}

export function formatDateForInput(date: string | Date | null | undefined) {
  if (!date) return ""

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    if (isNaN(dateObj.getTime())) return ""

    return dateObj.toISOString().split("T")[0]
  } catch (error) {
    return ""
  }
}

export function formatTimeForInput(time: string | null | undefined) {
  if (!time) return ""

  try {
    if (time.includes(":")) {
      const [hours, minutes] = time.split(":")
      return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
    }
    return time
  } catch (error) {
    return ""
  }
}
