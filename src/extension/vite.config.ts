import path from 'path'
import { defineConfig, mergeConfig, loadConfigFromFile, loadEnv } from 'vite'

export default defineConfig(async ({ command, mode }) => {
  const rootConfig = await loadConfigFromFile(
    { command: command, mode: mode },
    path.resolve(__dirname, "../../vite.config.ts")
  )

  const config: Record<string, any> = {}

  if (rootConfig?.config)
    return mergeConfig(rootConfig?.config, config)
  else
    return config
})
