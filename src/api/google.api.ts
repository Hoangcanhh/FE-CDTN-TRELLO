export const googleLogin = async (credential: string, user: any) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/google-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential, user }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Google login failed")
  }

  return response.json()
}

// Google register
export const googleRegister = async (credential: string, user: any) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/google-register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ credential, user }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Google registration failed")
  }

  return response.json()
}