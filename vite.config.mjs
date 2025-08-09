import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    build: {
        outDir: "build",
        chunkSizeWarningLimit: 2000,
    },
    plugins: [
        tsconfigPaths(),
        react(),
        tagger(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: 'PSG RepBuddy',
                short_name: 'Attendance',
                description: 'Offline-ready attendance management app for PSG',
                theme_color: '#2563eb',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    server: {
        port: "4028",
        host: "0.0.0.0",
        strictPort: true,
        allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
    }
});