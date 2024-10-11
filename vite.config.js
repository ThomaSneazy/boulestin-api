import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';
import EnvironmentPlugin from 'vite-plugin-environment';

// vite.config.js
export default defineConfig({
  plugins: [
    glsl(),
    EnvironmentPlugin('all', { prefix: 'VITE_' })
  ],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
  define: {
    'process.env': process.env,
    'import.meta.env.VITE_CONTACT_LOGIN': JSON.stringify(process.env.VITE_CONTACT_LOGIN),
    'import.meta.env.VITE_CONTACT_PASSWORD': JSON.stringify(process.env.VITE_CONTACT_PASSWORD)
  }
})
