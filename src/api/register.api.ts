import axios from 'axios';


export const register = async (username: string, email: string, password: string, confirmPassword: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/user/register`, {username, email, password, confirmPassword });
  return response.data;
};

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

// export const register = async (username: string, email: string, password: string, confirmPassword: string) => {
//   const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, email, password, confirmPassword }),
//   })

//   if (!response.ok) {
//     const errorData = await response.json()
//     throw new Error(errorData.message || "Registration failed")
//   }

//   return response.json()
// }
