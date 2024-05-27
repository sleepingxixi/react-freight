/**
 * 环境配置封装
 */
type ENV = 'dev' | 'stg' | 'prd';

let env: ENV = 'dev';
if (location.host === 'api-driver.marsview.cc') {
	env = 'prd';
} else if (location.host === 'api-driver-stg.marsview.cc') {
	env = 'stg';
} else {
	env = 'dev';
}
// const env = (document.documentElement.dataset.env as ENV) || 'stg';

const config = {
	dev: {
		baseApi: '/api',
		uploadApi: 'http://api-driver-dev.marsview.cc',
		cdn: 'http://xxx.aliyun.com',
		mock: true,
		// mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
		mockApi: 'https://www.fastmock.site/mock/af8cca2e4a9855b513ab85cb704d7c1e/api'
	},
	stg: {
		baseApi: '/api',
		uploadApi: 'http://api-driver-stg.marsview.cc',
		cdn: 'http://xxx.aliyun.com',
		mock: false,
		mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
	},
	prd: {
		baseApi: '/api',
		uploadApi: 'http://api-driver.marsview.cc',
		cdn: 'http://xxx.aliyun.com',
		mock: false,
		mockApi: 'https://www.fastmock.site/mock/5841b82d5672783b6fd62bb2a06aeb1f/api'
	}
};

export default {
	env,
	...config['dev']
};
