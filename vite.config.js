import { URL } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // See below for explanation about the resolve.alias config setting
  // https://vitejs.dev/config/shared-options.html#resolve-alias
  resolve: {
    alias: {
      // See below for explanation about forming path names to files
      // https://stackoverflow.com/a/66651120
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
