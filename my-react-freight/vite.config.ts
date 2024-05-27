import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': 'https://www.fastmock.site/mock/af8cca2e4a9855b513ab85cb704d7c1e/api'
		}
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	plugins: [react()]
});
