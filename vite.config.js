import { defineConfig, loadEnv } from 'vite'
import glsl from 'vite-plugin-glsl';
import EnvironmentPlugin from 'vite-plugin-environment';

// vite.config.js
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
  }
})
