"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaTrello } from "react-icons/fa6"
import { login } from "../api/login.api"
import { useGoogleOAuthRedirect } from "../hook/useGoogleOAuthRedirect"

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // ✅ Google OAuth Redirect Hook
  const { redirectToGoogle, isConfigured } = useGoogleOAuthRedirect({
    context: "signin",
    onError: (errorMessage: string) => {
      setError(errorMessage)
    },
  })

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message)
      window.history.replaceState({}, document.title)
    }
  }, [location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const data = await login(email, password)
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("email", data.email)
      navigate("/")
    } catch (err: any) {
      const msg = err?.response?.data?.message
      if (msg === "Email not found") setError("Email không tồn tại!")
      else if (msg === "Invalid password") setError("Mật khẩu không đúng!")
      else setError("Sai tài khoản hoặc mật khẩu!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setError("")
    setSuccess("")
    redirectToGoogle()
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80) center/cover",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#181818",
          padding: 40,
          borderRadius: 16,
          minWidth: 400,
          boxShadow: "0 4px 32px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 56, color: "#ff5722", marginBottom: 8 }}>
          <i className="fa fa-shopping-bag" />
        </div>
        <div
          style={{
            color: "#ccc",
            marginBottom: 24,
            fontSize: 22,
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <FaTrello style={{ marginRight: 8 }} />
          Trello welcome
        </div>

        {success && <div style={{ color: "#4caf50", marginBottom: 16, textAlign: "center" }}>{success}</div>}

        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          style={{
            width: "100%",
            marginBottom: 16,
            padding: 12,
            borderRadius: 6,
            border: "1.5px solid #333",
            backgroundColor: "#222",
            color: "#fff",
            fontSize: 16,
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          style={{
            width: "100%",
            marginBottom: 16,
            padding: 12,
            borderRadius: 6,
            border: "1.5px solid #333",
            backgroundColor: "#222",
            color: "#fff",
            fontSize: 16,
          }}
        />

        {error && <div style={{ color: "#ff5722", marginBottom: 16, textAlign: "center", fontSize: 14 }}>{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: 14,
            background: isLoading ? "#555" : "#0079bf",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "ĐANG ĐĂNG NHẬP..." : "SIGN IN"}
        </button>

        {/* Separator */}
        <div
          style={{
            width: "100%",
            margin: "20px 0",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div style={{ height: "1px", background: "#333", width: "100%" }}></div>
          <span
            style={{
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#181818",
              padding: "0 10px",
              color: "#ccc",
              fontSize: 14,
            }}
          >
            OR
          </span>
        </div>

        {/* ✅ Google Sign-In Button - Redirect Method */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading || !isConfigured}
          style={{
            width: "100%",
            padding: 14,
            background: isLoading || !isConfigured ? "#555" : "#fff",
            color: isLoading || !isConfigured ? "#fff" : "#333",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 1,
            cursor: isLoading || !isConfigured ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            transition: "all 0.2s ease",
          }}
        >
          {!isConfigured ? (
            "Cần cấu hình Google OAuth"
          ) : (
            <>
              <svg style={{ width: 18, height: 18, marginRight: 8 }} viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with google
            </>
          )}
        </button>

        <div style={{ marginTop: 16 }}>
          <span style={{ color: "#ccc" }}>Don't have an account? </span>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#40a9ff",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: 16,
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
