export const AuthUtils = {
  getToken(): string | null {
    if (typeof window === "undefined") return null

    // Chỉ dùng 1 key duy nhất
    const token = localStorage.getItem("token")

    if (token) {
      console.log(`🔑 Token found:`, token.substring(0, 20) + "...")
      return token
    }

    console.warn("🚨 No token found")
    return null
  },

  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
      console.log(`✅ Token saved`)
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    const email = localStorage.getItem("email")

    const isAuth = !!(token && (username || email))
    console.log("🔍 Auth check:", { hasToken: !!token, hasUsername: !!username, hasEmail: !!email, isAuth })

    return isAuth
  },

  clearTokens(): void {
    if (typeof window !== "undefined") {
      ;["token", "username", "email"].forEach((key) => localStorage.removeItem(key))
      console.log("🗑️ All tokens cleared")
    }
  },
}
