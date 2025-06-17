"use client"

// import type React from "react"
// import { useState } from "react"
// import { AuthUtils } from "..//auth"

// const DebugPanel: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [testToken, setTestToken] = useState("")

//   const handleSetTestToken = () => {
//     if (testToken.trim()) {
//       AuthUtils.setToken(testToken.trim())
//       alert("Token set successfully!")
//       setTestToken("")
//     }
//   }

//   const handleClearTokens = () => {
//     AuthUtils.clearTokens()
//     alert("All tokens cleared!")
//   }

//   const checkAuth = () => {
//     const token = AuthUtils.getToken()
//     const isAuth = AuthUtils.isAuthenticated()

//     alert(`
//       Token: ${token ? token.substring(0, 50) + "..." : "None"}
//       Is Authenticated: ${isAuth}
//     `)
//   }

//   if (!isOpen) {
//     return (
//       <button
//         onClick={() => setIsOpen(true)}
//         style={{
//           position: "fixed",
//           top: "10px",
//           right: "10px",
//           background: "#ff6b6b",
//           color: "white",
//           border: "none",
//           padding: "8px 12px",
//           borderRadius: "4px",
//           cursor: "pointer",
//           zIndex: 9999,
//           fontSize: "12px",
//         }}
//       >
//         Debug
//       </button>
//     )
//   }

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: "10px",
//         right: "10px",
//         background: "white",
//         border: "2px solid #ccc",
//         borderRadius: "8px",
//         padding: "16px",
//         zIndex: 9999,
//         minWidth: "300px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
//         <h3 style={{ margin: 0, fontSize: "14px" }}>Debug Panel</h3>
//         <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
//           ✕
//         </button>
//       </div>

//       <div style={{ marginBottom: "12px" }}>
//         <input
//           type="text"
//           placeholder="Paste JWT token here..."
//           value={testToken}
//           onChange={(e) => setTestToken(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             fontSize: "12px",
//             marginBottom: "8px",
//           }}
//         />
//         <button
//           onClick={handleSetTestToken}
//           style={{
//             background: "#4CAF50",
//             color: "white",
//             border: "none",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "12px",
//             marginRight: "8px",
//           }}
//         >
//           Set Token
//         </button>
//         <button
//           onClick={handleClearTokens}
//           style={{
//             background: "#f44336",
//             color: "white",
//             border: "none",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "12px",
//             marginRight: "8px",
//           }}
//         >
//           Clear
//         </button>
//         <button
//           onClick={checkAuth}
//           style={{
//             background: "#2196F3",
//             color: "white",
//             border: "none",
//             padding: "6px 12px",
//             borderRadius: "4px",
//             cursor: "pointer",
//             fontSize: "12px",
//           }}
//         >
//           Check
//         </button>
//       </div>

//       <div style={{ fontSize: "12px", color: "#666" }}>
//         <p>Current token: {AuthUtils.getToken() ? "✅ Present" : "❌ Missing"}</p>
//         <p>Authenticated: {AuthUtils.isAuthenticated() ? "✅ Yes" : "❌ No"}</p>
//       </div>
//     </div>
//   )
// }

// export default DebugPanel
