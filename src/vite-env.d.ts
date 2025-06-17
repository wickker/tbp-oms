/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_REACT_APP_PUBLIC_POSTHOG_KEY: string
  readonly VITE_REACT_APP_PUBLIC_POSTHOG_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
