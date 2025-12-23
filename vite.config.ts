import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Most specific aliases FIRST (for src/components files)
      { find: '@/components/ui', replacement: path.resolve(__dirname, './src/components/ui') },
      { find: '@/components/SEO', replacement: path.resolve(__dirname, './src/components/SEO') },
      { find: '@/components/ProtectedRoute', replacement: path.resolve(__dirname, './src/components/ProtectedRoute') },
      { find: '@/components/ErrorBoundary', replacement: path.resolve(__dirname, './src/components/ErrorBoundary') },
      { find: '@/components/LoadingSkeleton', replacement: path.resolve(__dirname, './src/components/LoadingSkeleton') },
      // AdminLogin is in src/components/admin, but other admin components are in Components/admin
      { find: '@/components/admin/AdminLogin', replacement: path.resolve(__dirname, './src/components/admin/AdminLogin') },
      // General components alias (for Components folder including admin components)
      { find: '@/components', replacement: path.resolve(__dirname, './Components') },
      // Base alias
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
})

