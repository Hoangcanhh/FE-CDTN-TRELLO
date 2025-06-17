// ✅ Clean Google OAuth2 Configuration - Redirect Flow Only
export const GOOGLE_OAUTH_CONFIG = {
  CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  REDIRECT_URI: import.meta.env.VITE_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/google/callback`,
  SCOPE: "openid email profile",

  // OAuth2 endpoints
  AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN_URL: "https://oauth2.googleapis.com/token",

  // Generate OAuth2 URL
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URI,
      scope: this.SCOPE,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
      ...(state && { state }),
    })

    return `${this.AUTH_URL}?${params.toString()}`
  },

  // Validation
  isConfigured(): boolean {
    return !!this.CLIENT_ID && this.CLIENT_ID !== "your-google-client-id-here.apps.googleusercontent.com"
  },
}

export interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
  email_verified?: boolean
}

export interface GoogleTokenResponse {
  access_token: string
  id_token: string
  refresh_token?: string
  expires_in: number
  token_type: string
}
