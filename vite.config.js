import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base:
    process.env.VITE_BASE_PATH ||
    "/CHRLOR25533_FTO2506_GroupB_ChristopherLord_DJSPP",
});
