import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'))

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.GITHUB_REF_NAME || pkg.version || 'dev'),
  },
  plugins: [
    react(),
    {
      name: 'static-subdir-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const staticRoutes = ['/torcidaeduka']
          const match = staticRoutes.find(r =>
            req.url === r || req.url === r + '/' || req.url?.startsWith(r + '/')
          )
          if (match) {
            const filePath = path.resolve(__dirname, 'public', match.slice(1), 'index.html')
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'text/html')
              res.end(fs.readFileSync(filePath))
              return
            }
          }
          next()
        })
      },
    },
  ],
}))
