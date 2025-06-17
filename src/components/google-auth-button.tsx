"use client"

import { useState } from "react"
import { FaGoogle } from "react-icons/fa"
import styles from "../styles/googleAuthButton.module.scss"

interface GoogleAuthButtonProps {
  onSuccess: (userData: any) => void
  onFailure: (error: Error) => void
}

const GoogleAuthButton = ({ onSuccess, onFailure }: GoogleAuthButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = () => {
    setIsLoading(true)

    // Thông tin client ID từ Google Developer Console
    const clientId =  "YOUR_GOOGLE_CLIENT_ID"

    // URL chuyển hướng sau khi xác thực
    const redirectUri = `${window.location.origin}/auth/google-callback`

    // Phạm vi quyền truy cập
    const scope = "email profile"

    // Tạo state để bảo vệ khỏi CSRF
    const state = Math.random().toString(36).substring(2)
    sessionStorage.setItem(
      "google_oauth_state",
      JSON.stringify({
        state,
        context: "invite",
        timestamp: Date.now(),
      }),
    )

    // Tạo URL xác thực Google
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&state=${state}&prompt=select_account`

    // Mở cửa sổ popup cho xác thực Google
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const popup = window.open(googleAuthUrl, "googleAuth", `width=${width},height=${height},left=${left},top=${top}`)

    // Kiểm tra kết quả từ popup
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup)
        setIsLoading(false)

        // Kiểm tra xem có dữ liệu người dùng được lưu không
        const userData = sessionStorage.getItem("google_user_data")
        if (userData) {
          const parsedData = JSON.parse(userData)
          sessionStorage.removeItem("google_user_data")
          onSuccess(parsedData)
        } else {
          onFailure(new Error("Đăng nhập bị hủy hoặc thất bại"))
        }
      }
    }, 1000)
  }

  return (
    <button className={styles.googleButton} onClick={handleGoogleLogin} disabled={isLoading}>
      <FaGoogle className={styles.googleIcon} />
      {isLoading ? "Đang xử lý..." : "Đăng nhập bằng Google"}
    </button>
  )
}

export default GoogleAuthButton
