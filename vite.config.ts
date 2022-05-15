import path from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode}) =>{
  process.env = { ...loadEnv(mode, process.cwd()) }

  return {
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
  }
})
