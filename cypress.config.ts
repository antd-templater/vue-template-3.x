import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})
