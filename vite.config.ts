import { loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { AntdLibraryResolver } from '@antd-templater/library-3.x/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoComponents from 'unplugin-vue-components/vite'
import ViteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const cwd = process.cwd()
  const env = loadEnv(mode, cwd)
  const base = env.VITE_APP_PAGE_BASE || '/'
  const offGzip = env.VITE_APP_ENABLE_GZIP !== 'true'

  return {
    root: cwd,
    base: base,

    test: {
      globals: true,
      environment: 'jsdom'
    },

    css: {
      modules: false,
      devSourcemap: true,
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    },

    resolve: {
      alias: {
        '@/': fileURLToPath(new URL('./src', import.meta.url)) + '/'
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
      AutoComponents({
        dirs: ['src/components'],
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: 'less'
          })
        ],
        include: [
          /\.[tj]sx?/,
          /\.vue\?vue/,
          /\.vue$/
        ]
      }),
      AutoImport({
        resolvers: [
          AntdLibraryResolver()
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
      VueJsx(),
      Vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      })
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
        logLevel: 'silent',
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (/\/node_modules\/(@ant-design\/colors)(\/|$)/.test(id)) return 'ant-design-colors'
            if (/\/node_modules\/(@ant-design\/icons-svg)(\/|$)/.test(id)) return 'ant-design-icons-svg'
            if (/\/node_modules\/(@ant-design\/icons-vue)(\/|$)/.test(id)) return 'ant-design-icons-vue'
            if (/\/node_modules\/(@ant-design\/icons-(\w+))(\/|$)/.test(id)) return 'ant-design-icons-helper'
            if (/\/node_modules\/(@antd-templater\/library-3.x)(\/|$)/.test(id)) return 'antd-template-library'
            if (/\/node_modules\/(@?ant-design-vue(\/.+)?\/(locale\/\w+_))/.test(id)) return 'ant-design-localer'
            if (/\/node_modules\/(@?cookie|@?vue-ls|@?pinia(-plugin-\w+)?)(\/|$)/.test(id)) return 'storage-all'
            if (/\/node_modules\/(@?vue|@?vuex|@?vue-router)(\/|$)/.test(id)) return 'vue-all'
            if (/\/node_modules\/(@?mswjs|@?msw|@?graphql)(\/|$)/.test(id)) return 'msw-all'
            if (/\/node_modules\/(@?ant-design-vue)(\/|$)/.test(id)) return 'antdv-all'
            if (/\/node_modules\/(axios|qs)(-\w+)?(\/|$)/.test(id)) return 'fetch-all'
            if (/\/node_modules\/(lodash(-\w+)?)(\/|$)/.test(id)) return 'lodash-all'
            if (/\/node_modules\/(jquery(-\w+)?)(\/|$)/.test(id)) return 'jquery-all'
            if (/\/node_modules\/(moment|dayjs)(\/|$)/.test(id)) return 'date-all'
            if (/\/node_modules\/(darkreader)(\/|$)/.test(id)) return 'darker-all'
            if (/\/node_modules\//.test(id)) return 'vendors-all'

            if (/\/src\/assets\/.+/.test(id)) return 'assets-all'
            if (/\/src\/test\/.+/.test(id)) return 'temporary'
            if (/\/src\/mock\/.+/.test(id)) return 'temporary'
            if (/\/src\/.+\/.+/.test(id)) return 'bootstrap'
            if (/\/src\//.test(id)) return 'main'
          }
        }
      }
    }
  }
})
