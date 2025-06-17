"use client"

import { useCallback } from "react"

interface UseGoogleOAuthRedirectOptions {
  onError?: (error: string) => void
  context?: "signin" | "signup"
}

export function useGoogleOAuthRedirect({ onError, context = "signin" }: UseGoogleOAuthRedirectOptions = {}) {
  // ✅ Lấy client ID từ biến môi trường
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

  // ✅ Sử dụng redirect URI cố định, không phụ thuộc vào context
  const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`

  // Generate state parameter for security
  const generateState = useCallback(() => {
    const randomBytes = new Uint8Array(32)
    crypto.getRandomValues(randomBytes)
    return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
  }, [])

  // Redirect to Google OAuth
  const redirectToGoogle = useCallback(() => {
    if (!CLIENT_ID) {
      const error = "⚠️ Cần cấu hình VITE_GOOGLE_CLIENT_ID trong file .env"
      console.error(error)
      onError?.(error)
      return
    }

    try {
      // Generate and store state for security
      const state = generateState()
      const stateData = {
        state,
        context,
        timestamp: Date.now(),
      }

      // Store state in sessionStorage for verification later
      sessionStorage.setItem("google_oauth_state", JSON.stringify(stateData))

      // ✅ Log thông tin chi tiết để debug
      console.log("🔍 Google OAuth Config:", {
        clientId: CLIENT_ID,
        redirectUri: REDIRECT_URI,
        context,
        origin: window.location.origin,
        currentUrl: window.location.href,
      })

      // ✅ Đảm bảo redirect URI luôn nhất quán
      const finalRedirectUri = REDIRECT_URI.startsWith("http")
        ? REDIRECT_URI
        : `${window.location.origin}/auth/google/callback`

      // ✅ Tạo URL OAuth với các tham số chính xác
      const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: finalRedirectUri,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state: state,
        // ✅ Thêm include_granted_scopes để đảm bảo tính nhất quán
        include_granted_scopes: "true",
      })

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`

      console.log("🔍 Final OAuth URL:", authUrl)
      console.log("🔍 Final Redirect URI:", finalRedirectUri)
      console.log("🔍 Context:", context)

      // ✅ Thêm delay nhỏ để đảm bảo state được lưu
      setTimeout(() => {
        window.location.href = authUrl
      }, 100)
    } catch (error: any) {
      console.error("❌ Error redirecting to Google:", error)
      const errorMessage = `Lỗi khi chuyển hướng đến Google: ${error.message}`
      onError?.(errorMessage)
    }
  }, [CLIENT_ID, REDIRECT_URI, generateState, context, onError])

  return {
    redirectToGoogle,
    isConfigured: !!CLIENT_ID,
  }
}
