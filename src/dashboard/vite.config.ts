import path, { resolve } from 'path'
import { defineConfig, mergeConfig, loadConfigFromFile, loadEnv } from 'vite'

export default defineConfig(async ({ command, mode }) => {
  const rootConfig = await loadConfigFromFile(
    { command: command, mode: mode },
    path.resolve(__dirname, "../../vite.config.ts")
  )

  const config: Record<string, any> = {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
          commentator: resolve(__dirname, 'commentator.html'),
        },
      },
    },
  }

  if (rootConfig?.config)
    return mergeConfig(rootConfig?.config, config)
  else
    return config
})
