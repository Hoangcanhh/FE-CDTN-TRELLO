import { AuthUtils } from "../utils/auth"

export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  ENDPOINTS: {
    LISTS: "/lists",
    CARDS: "/cards",
    BOARDS: "/boards",
    COLUMNS: "/columns",
  },
}

export const getAuthHeaders = (): HeadersInit => {
  const token = AuthUtils.getToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    // Ensure Bearer prefix
    const bearerToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`
    headers.Authorization = bearerToken
    console.log("🔐 Authorization header set:", bearerToken.substring(0, 30) + "...")
  } else {
    console.warn("⚠️ No token available for request")
  }

  return headers
}

export const handleApiError = (error: any): never => {
  // ✅ Improved error logging
  console.error("❌ API Error details:", {
    error,
    message: error?.message,
    status: error?.status,
    stack: error?.stack,
    name: error?.name,
  })

  // Handle 401 Unauthorized
  if (error.status === 401 || error.message?.includes("401")) {
    console.warn("🚨 Unauthorized - Token invalid or expired")
    AuthUtils.clearTokens()

    // Redirect to login
    if (typeof window !== "undefined") {
      alert("Session expired. Please login again.")
      window.location.href = "/login"
    }
  }

  throw new Error(error.message || "An error occurred")
}
