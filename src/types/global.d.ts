// ✅ Global type declarations for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleInitConfig) => void
          prompt: (callback?: (notification: GooglePromptNotification) => void) => void
          renderButton?: (element: HTMLElement, config: any) => void
          disableAutoSelect?: () => void
        }
      }
    }
  }
}

interface GoogleInitConfig {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
  use_fedcm_for_prompt?: boolean
  context?: "signin" | "signup" | "use"
  ux_mode?: "popup" | "redirect"
  itp_support?: boolean
}

interface GoogleCredentialResponse {
  credential: string
  select_by?: string
}

interface GooglePromptNotification {
  isNotDisplayed?: () => boolean
  isSkippedMoment?: () => boolean
  isDismissedMoment?: () => boolean
  getMomentType?: () => string
}

interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
}

export {}
