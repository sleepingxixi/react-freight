import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
	// // 这里我尝试想部署到https://github.com/sleepingxixi/react-freight，所以这是base
	// base: '/react-freight/',
	server: {
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': 'http://api-driver-dev.marsview.cc'
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [
		react(),
		// 由于esbuild不支持es5，所以需要通过插件的方式，通过babel生成对低版本兼容的文件。不过这个文件是按需加载
		legacy({
			targets: ['defaults', 'not IE 11']
		})
	],
	build: {
		// 默认情况下，vite会把小型资源转化成data URI，避免额外http的请求，可以通过此设置为0表示禁用。
		// 或者设置指定的数值，默认为4096，4kib
		assetsInlineLimit: 0,
		target: 'es2015'
	}
});
