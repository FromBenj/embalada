import { defineConfig } from 'vite'

export default defineConfig({
    base: '/explosion/',
    build: {
        chunkSizeWarningLimit: 1500,
    }
})