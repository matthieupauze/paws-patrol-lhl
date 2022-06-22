/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = loadEnv(mode, path.resolve(process.cwd(), '../'), 'VITE_');
  return {
    plugins: [react()],
    server: {
      port: process.env.PORT || process.env.VITE_PORT_REACT,
      strictPort: true,
    },
  };
});
