import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages では https://nrbt39-rgb.github.io/task-board/ で配信される
  base: '/task-board/',
})
