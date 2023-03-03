import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  mode: 'development',
  // mode: 'production',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});


// .env는 매번 읽지만 .env.mode가 있으면 .env.mode가 우선 순위를 지님

/*
* npm run dev => development
* npm run build => production
* */