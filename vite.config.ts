
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Safeye',
        short_name: 'Safeye',
        description: 'Sistema avançado de monitoramento de sonolência para motoristas.',
        theme_color: '#191b21',
        background_color: '#191b21',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
            type: 'image/png',
          },
          {
            src: '/placeholder.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
