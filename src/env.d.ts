/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPREADSHEET_ID: string
  readonly VITE_SPREADSHEET_API_KEY: string
  readonly VITE_SHEET_RUNNER_INFO_ID: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
