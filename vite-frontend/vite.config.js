import { defineConfig } from 'vite'

export default defineConfig({
    // Base URL for your app (can be empty or "/")
    base: '',
    // Conditionally load the plugin based on the environment
    plugins: [
        process.env.NODE_ENV === 'development' && require('@vitejs/plugin-react').default()
    ].filter(Boolean),  // This removes any undefined values, in case the plugin is not added in production
    server: {
        // Open the browser when the dev server starts
        open: true,
        // Default port for dev server
        port: 4040,
    },
})
