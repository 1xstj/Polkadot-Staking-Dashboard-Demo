import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@polkadot/api', '@polkadot/util', '@polkadot/util-crypto']
  }
})
