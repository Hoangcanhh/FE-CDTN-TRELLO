// ✅ Single source of truth for Google OAuth types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleIdConfiguration) => void
          prompt: (callback?: (notification: PromptMomentNotification) => void) => void
          renderButton: (parent: HTMLElement, options: GsiButtonConfiguration) => void
          disableAutoSelect: () => void
          cancel: () => void
          revoke: (email: string, callback: () => void) => void
        }
      }
    }
  }
}

export interface GoogleIdConfiguration {
  client_id: string
  callback: (response: CredentialResponse) => void
  auto_select?: boolean
  cancel_on_tap_outside?: boolean
  use_fedcm_for_prompt?: boolean
  context?: "signin" | "signup" | "use"
  ux_mode?: "popup" | "redirect"
  login_uri?: string
  native_callback?: (response: CredentialResponse) => void
  intermediate_iframe_close_callback?: () => void
  itp_support?: boolean
  state_cookie_domain?: string
}

export interface CredentialResponse {
  credential: string
  select_by?: string
  client_id?: string
}

export interface PromptMomentNotification {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
  getNotDisplayedReason: () => string
  getSkippedReason: () => string
  getDismissedReason: () => string
  getMomentType: () => string
}

export interface GsiButtonConfiguration {
  type?: "standard" | "icon"
  theme?: "outline" | "filled_blue" | "filled_black"
  size?: "large" | "medium" | "small"
  text?: "signin_with" | "signup_with" | "continue_with" | "signin"
  shape?: "rectangular" | "pill" | "circle" | "square"
  logo_alignment?: "left" | "center"
  width?: string | number
  locale?: string
}

export interface GoogleUser {
  email: string
  name: string
  picture: string
  sub: string
  email_verified?: boolean
}
