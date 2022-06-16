/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), '../'), '');
  return {
    plugins: [react()],
    server: {
      port: env.REACT_PORT,
      strictPort: true,
    },
  };
});
