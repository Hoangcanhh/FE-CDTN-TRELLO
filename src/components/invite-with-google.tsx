"use client"

import { useState } from "react"
import GoogleAuthButton from "./google-auth-button"
import styles from "../styles/inviteWithGoogle.module.scss"

interface InviteWithGoogleProps {
  onInviteSuccess: (user: any) => void
}

const InviteWithGoogle = ({ onInviteSuccess }: InviteWithGoogleProps) => {
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSuccess = (userData: any) => {
    console.log("Google login success:", userData)

    // Gửi lời mời đến email của người dùng Google
    // Đây là nơi bạn sẽ gọi API để gửi lời mời

    onInviteSuccess(userData)
  }

  const handleGoogleFailure = (error: Error) => {
    console.error("Google login failed:", error)
    setError(error.message)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Mời bằng tài khoản Google</h3>

      {error && <div className={styles.error}>{error}</div>}

      <GoogleAuthButton onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />

      <p className={styles.info}>Đăng nhập bằng Google để mời bạn bè từ danh bạ Google của bạn</p>
    </div>
  )
}

export default InviteWithGoogle
