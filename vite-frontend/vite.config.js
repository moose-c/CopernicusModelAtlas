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

    preview: {
        host: '0.0.0.0',  // Allow external access for preview as well
        port: 8080,        // Preview server on port 8080
    },
})
