import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
import refreshPlugin from './src/plugins/refreshPlugin.ts';

const now = new Date().getTime(); // 定义一个时间戳

// https://vitejs.dev/config/
export default defineConfig({
  // // 这里我尝试想部署到https://github.com/sleepingxixi/react-freight，所以这是base
  // base: '/react-freight/',
  base: '/',
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api/user': 'http://8.147.116.161:3000',
      '/api/wifi': 'http://8.147.116.161:3000'
      // '/api/user': 'http://127.0.0.1:3000',
      // '/api/wifi': 'http://127.0.0.1:3000'

      // '/api/user': 'http://localhost:3000',
      // '/ws': {
      //   // target: 'ws://192.168.0.66:60601/',这是后端接口地址
      //   target: 'ws://localhost:4000/',
      //   changeOrigin: true,
      //   ws: true
      // },
      // "/socket.io/": {
      //   target: 'ws://localhost:4000',
      //   // ws: true,
      //   // rewrite: (path) => path.replace(/^\/socket.io\//, ''),
      // },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    refreshPlugin({
      version: now
    }),
    // 由于esbuild不支持es5，所以需要通过插件的方式，通过babel生成对低版本兼容的文件。不过这个文件是按需加载
    // legacy({
    // 	targets: ['defaults', 'not IE 11']
    // })
  ],
  build: {
    // 默认情况下，vite会把小型资源转化成data URI，避免额外http的请求，可以通过此设置为0表示禁用。
    // 或者设置指定的数值，默认为4096，4kib
    // assetsInlineLimit: 0,
    // target: 'es2015',
    target: 'esnext',
    // sourcemap:true,
  },
  // 缓存全局的版本时间戳
  define: {
    __MY_APP_VERSION__: now,
  }
});
