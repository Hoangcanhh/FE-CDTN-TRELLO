import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

export interface LoginResponse {
  token: string
  username: string
  email: string
  avatar?: string
  message: string
}

export interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
  email_verified?: boolean
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
  // Lưu thông tin user vào localStorage
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};

export async function googleLogin(credential: string, user: GoogleUser): Promise<LoginResponse> {
  console.log("🔍 === GOOGLE LOGIN API ===")
  console.log("🔍 API URL:", `${API_BASE_URL}/auth/google-login`)
  console.log("🔍 Credential length:", credential?.length || 0)
  console.log("🔍 User data:", user)

  const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      user,
    }),
  })

  console.log("🔍 Google login response status:", response.status)

  if (!response.ok) {
    const errorData = await response.json()
    console.error("❌ Google login API error:", errorData)
    throw new Error(errorData.message || "Google login failed")
  }

  const result = await response.json()
  console.log("✅ Google login API success:", {
    hasToken: !!result.token,
    username: result.username,
    email: result.email,
    message: result.message,
  })

  return result
}

// ✅ Sửa tên function và export đúng
export async function googleRegister(credential: string, user: GoogleUser) {
  console.log("🔍 === GOOGLE REGISTER API ===")
  console.log("🔍 API URL:", `${API_BASE_URL}/auth/google-register`)
  console.log("🔍 Credential length:", credential?.length || 0)
  console.log("🔍 User data:", user)

  const response = await fetch(`${API_BASE_URL}/auth/google-register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      user,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    console.error("❌ Google register API error:", errorData)
    throw new Error(errorData.message || "Google registration failed")
  }

  const result = await response.json()
  console.log("✅ Google register API success:", result)
  return result
}

export async function register(username: string, email: string, password: string, confirmPassword: string) {
  console.log("🔍 Register API call to:", `${API_BASE_URL}/auth/register`)

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Registration failed")
  }

  return response.json()
}
