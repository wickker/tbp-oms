/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_URL_FE: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_LOGIN_URL: string
  readonly VITE_USE_MIRAGE: string
  readonly VITE_WSS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
