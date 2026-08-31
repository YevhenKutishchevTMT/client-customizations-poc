import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const VIRTUAL_ID = 'virtual:active-client'
const RESOLVED_VIRTUAL_ID = '\0' + VIRTUAL_ID

function activeClientPlugin(client: string | undefined): Plugin {
  return {
    name: 'active-client',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return

      if (!client) {
        throw new Error('Missing CLIENT env var. Usage: CLIENT=<name> npm run build')
      }

      const dir = path.resolve(import.meta.dirname, 'src/clients', client)
      if (!fs.existsSync(dir)) {
        throw new Error(`No such client folder: src/clients/${client}`)
      }

      const files = fs.readdirSync(dir).filter((f) => /\.tsx?$/.test(f))
      return files.map((f) => `import '/src/clients/${client}/${f}'`).join('\n')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), activeClientPlugin(process.env.CLIENT)],
})
