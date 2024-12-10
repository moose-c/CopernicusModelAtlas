import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        // Open the browser when the dev server starts
        open: true,
        // Default port for dev server
        port: 8080,
    },
})
