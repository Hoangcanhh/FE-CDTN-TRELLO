// ✅ API để exchange authorization code cho tokens
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"

export interface GoogleTokenExchangeRequest {
  code: string
  context: "signin" | "signup"
  redirect_uri: string
}

export interface GoogleTokenExchangeResponse {
  user: {
    email: string
    name: string
    picture: string
    sub: string
    email_verified: boolean
  }
  credential: string
}

export async function exchangeGoogleCode(data: GoogleTokenExchangeRequest): Promise<GoogleTokenExchangeResponse> {
  console.log("🔍 === CALLING GOOGLE EXCHANGE API ===")
  console.log("🔍 API URL:", `${API_BASE_URL}/auth/google/exchange`)
  console.log("🔍 Request data:", data)

  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    console.log("🔍 Response status:", response.status)
    console.log("🔍 Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API Error Response:", errorText)

      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }

      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("✅ API Success Response:", result)
    return result
  } catch (error: any) {
    console.error("❌ Exchange API Error:", error)
    throw error
  }
}
