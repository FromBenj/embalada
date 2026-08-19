import { defineConfig } from 'vite'

export default defineConfig({
    base: '/embalada/',
    build: {
        chunkSizeWarningLimit: 1500,
    }
})