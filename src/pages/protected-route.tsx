"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
}

// ✅ Component để bảo vệ các route cần đăng nhập
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const username = localStorage.getItem("username")
      const email = localStorage.getItem("email")

      console.log("🔍 Checking authentication:", {
        hasToken: !!token,
        hasUsername: !!username,
        hasEmail: !!email,
      })

      if (token && (username || email)) {
        setIsAuthenticated(true)
        console.log("✅ User is authenticated")
      } else {
        setIsAuthenticated(false)
        console.log("❌ User is not authenticated, redirecting to login")
        navigate("/login", { replace: true })
      }
    }

    checkAuth()
  }, [navigate])

  // Loading state
  if (isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #0079bf",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ color: "#666" }}>Đang kiểm tra đăng nhập...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    )
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>
  }

  // If not authenticated, return null (will redirect)
  return null
}
