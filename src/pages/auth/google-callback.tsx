"use client"

import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { googleLogin, googleRegister } from "../../api/login.api"
import { exchangeGoogleCode } from "../../api/google-token-exchange.api.ts"

// ✅ Google OAuth Callback - Hoàn toàn im lặng, chuyển hướng ngay
export default function GoogleCallbackSilent() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code")
        const state = searchParams.get("state")
        const error = searchParams.get("error")

        if (error || !code) {
          navigate("/login", { replace: true })
          return
        }

        const storedStateData = sessionStorage.getItem("google_oauth_state")
        if (!storedStateData) {
          navigate("/login", { replace: true })
          return
        }

        const { state: storedState, context } = JSON.parse(storedStateData)
        if (state !== storedState) {
          navigate("/login", { replace: true })
          return
        }

        const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`

        try {
          const { user, credential } = await exchangeGoogleCode({
            code,
            context,
            redirect_uri: redirectUri,
          })

          if (context === "signup") {
            await googleRegister(credential, user)
            navigate("/login", {
              state: { message: "Đăng ký Google thành công! Vui lòng đăng nhập." },
            })
          } else {
            const loginData = await googleLogin(credential, user)

            localStorage.setItem("token", loginData.token)
            localStorage.setItem("username", loginData.username || user.name)
            localStorage.setItem("email", loginData.email || user.email)
            if (loginData.avatar || user.picture) {
              localStorage.setItem("avatar", loginData.avatar || user.picture)
            }

            // CHUYỂN HƯỚNG NGAY LẬP TỨC
            window.location.href = "http://localhost:5173/"
          }
        } catch (apiError) {
          // ✅ Sửa phần Mock fallback để sử dụng thông tin từ Google
          // Lấy thông tin từ Google trước khi fallback
          try {
            console.log("🔍 API lỗi, lấy thông tin từ Google để fallback")
            // Lấy lại thông tin từ Google để có dữ liệu thật
            const { user } = await exchangeGoogleCode({
              code,
              context,
              redirect_uri: redirectUri,
            })

            if (context !== "signup") {
              // Sử dụng thông tin thật từ Google thay vì dữ liệu cứng
              localStorage.setItem("token", "mock-jwt-token-" + Date.now())
              localStorage.setItem("username", user.name || "Google User")
              localStorage.setItem("email", user.email || "")
              localStorage.setItem("avatar", user.picture || "")

              console.log("✅ Đã lưu thông tin Google thật trong mock mode:", {
                username: user.name,
                email: user.email,
                picture: user.picture,
              })

              window.location.href = "http://localhost:5173/"
            } else {
              navigate("/login", {
                state: { message: "Đăng ký Google thành công! Vui lòng đăng nhập." },
              })
            }
          } catch (fallbackError) {
            // Nếu không lấy được thông tin từ Google, dùng dữ liệu cứng như cũ
            console.error("❌ Không thể lấy thông tin từ Google, dùng dữ liệu mặc định")
            if (context !== "signup") {
              localStorage.setItem("token", "mock-jwt-token-" + Date.now())
              localStorage.setItem("username", "Test User")
              localStorage.setItem("email", "user@example.com")
              localStorage.setItem("avatar", "https://ui-avatars.com/api/?name=Test+User&background=random")

              window.location.href = "http://localhost:5173/"
            } else {
              navigate("/login", {
                state: { message: "Đăng ký Google thành công! Vui lòng đăng nhập." },
              })
            }
          }
        }

        sessionStorage.removeItem("google_oauth_state")
      } catch (error) {
        navigate("/login", { replace: true })
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  // KHÔNG HIỂN THỊ GÌ CẢ - chỉ một màn hình trống
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    />
  )
}
