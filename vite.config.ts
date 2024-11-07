import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                id: '',
                lang: 'PL',
                dir: 'ltr',
                name: 'Paplanek',
                short_name: 'Paplanek',
                description: 'Najlepszy czat w 2024 roku!',
                theme_color: '#f3f4f6',
                background_color: '#f3f4f6',
                icons: [
                    {
                        src: 'icons/chat64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/chat128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/chat192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/chat512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
                start_url: '/',
                display: 'fullscreen',
                orientation: 'landscape',
            },
        }),
    ],
})
