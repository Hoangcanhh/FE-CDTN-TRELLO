"use client"

import React from "react"
import "./App.css"
import styles from "./styles/app.module.scss"
import Header from "./components/header"
import Board from "./components/board"
import BoardList from "./components/boardList"
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import GoogleCallback from "./pages/auth/google-callback"

// ✅ Cải thiện PrivateRoute với loading state
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = React.useState(true)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token")
      const username = localStorage.getItem("username")
      const email = localStorage.getItem("email")

      console.log("🔍 PrivateRoute auth check:", {
        hasToken: !!token,
        hasUsername: !!username,
        hasEmail: !!email,
      })

      setIsAuthenticated(!!(token && (username || email)))
      setIsChecking(false)
    }

    checkAuth()
  }, [])

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

// Component wrapper cho Board với boardId từ URL params
function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>()

  if (!boardId) {
    return <Navigate to="/boards" replace />
  }

  return <Board boardId={boardId} />
}

function AppContent() {
  const location = useLocation()
  // ✅ Thêm /boards vào danh sách ẩn header để full screen
  const noHeaderPaths = ["/login", "/register", "/auth"] // ✅ Bỏ "/boards" ra
  const hideHeader = noHeaderPaths.some((path) => location.pathname.startsWith(path))

  return (
    <div className={`${styles.app} ${hideHeader ? styles["no-header"] : ""}`}>
      {!hideHeader && <Header />}
      <div className={styles.container}>
        <div className={styles.main}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />

            {/* ✅ Route chính - hiển thị Board với boardId mặc định */}
            <Route
              path="/boards"
              element={
                <PrivateRoute>
                  <Board boardId="default" />
                </PrivateRoute>
              }
            />

            {/* Route cho danh sách boards (nếu cần) */}
            <Route
              path="/boards/list"
              element={
                <PrivateRoute>
                  <BoardList />
                </PrivateRoute>
              }
            />

            {/* Route cho board cụ thể */}
            <Route
              path="/board/:boardId"
              element={
                <PrivateRoute>
                  <BoardPage />
                </PrivateRoute>
              }
            />

            {/* Redirect root to boards */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/boards" replace />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </BrowserRouter>
  )
}

export default App
