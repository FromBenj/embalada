import { defineConfig } from 'vite'

export default defineConfig({
    base: '/creative/embalada/',
    build: {
        chunkSizeWarningLimit: 1500,
    }
})