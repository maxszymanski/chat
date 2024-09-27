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
				name: 'LiveChat',
				short_name: 'Chat',
				description: 'Chat',
				theme_color: 'rgb(243 244 246)',
				// icons: [
				// 	{
				// 		src: '/logo192.png',
				// 		sizes: '192x192',
				// 		type: 'image/png',
				// 	},
				// 	{
				// 		src: '/logo512.png',
				// 		sizes: '512x512',
				// 		type: 'image/png',
				// 	},
				// ],
			},
		}),
	],
})
