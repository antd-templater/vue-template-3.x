import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import ViteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteLegacy from '@vitejs/plugin-legacy'
import VueMacros from 'unplugin-vue-macros'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const cwd = process.cwd()
  const env = loadEnv(mode, cwd)
  const base = env.VITE_APP_PAGE_BASE || '/'
  const offGzip = env.VITE_APP_ENABLE_GZIP !== 'true'

  return {
    base,

    test: {
      globals: true
    },

    css: {
      modules: false,
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          modifyVars: { 'root-entry-name': 'variable' },
          javascriptEnabled: true
        }
      }
    },

    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname
      }
    },

    server: {
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888/api',
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true
        }
      }
    },

    plugins: [
      ViteCompression({
        disable: offGzip,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue\?vue/,
          /\.vue$/,
          /\.md$/
        ],
        imports: [
          'vue',
          'pinia',
          'vue-router'
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        },
        dts: true
      }),
      Components({
        dirs: ['src/components'],
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'less'
          })
        ]
      }),
      ViteLegacy({
        targets: ['defaults', 'not IE 11']
      }),
      VueMacros.vite(),
      VueJsx(),
      Vue()
    ],

    build: {
      minify: 'terser',
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (/\/node_modules\/@ant-design\/icons-(\w+)\/?/.test(id)) return 'antd-design-icons'
            if (/\/node_modules\/(@ant-design(-\w+)?|ant-design-vue|nprogress)\//.test(id)) return 'antd-design-all'
            if (/\/node_modules\/(cookie|vue-ls|pinia(-plugin-\w+)?)\//.test(id)) return 'storage-all'
            if (/\/node_modules\/(@?vue|vuex|vue-router)\//.test(id)) return 'vue-all'
            if (/\/node_modules\/(@mswjs|msw|graphql)\//.test(id)) return 'msw-all'
            if (/\/node_modules\/(moment|dayjs)\/.+/.test(id)) return 'date-all'
            if (/\/node_modules\/(axios|qs)\/.+/.test(id)) return 'fetch-all'
            if (/\/node_modules\//.test(id)) return 'vendors-all'

            if (/\/src\/components\/.+/.test(id)) return 'components-all'
            if (/\/src\/layout\/.+/.test(id)) return 'layout-all'
            if (/\/src\/mock\/.+/.test(id)) return 'mocks-all'
            if (/\/src\/.+\/.+/.test(id)) return 'bootstrap'
            if (/\/src\//.test(id)) return 'main'
          }
        }
      }
    }
  }
})
