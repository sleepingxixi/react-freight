import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { hideLoading, showLoading } from './loading';
import storage from './storage';
import env from '@/config';
import { Result } from '@/types/api';

console.log(import.meta.env);
// 创建实例
const instance = axios.create({
	// baseURL: import.meta.env.VITE_BASE_API,
	timeout: 10000,
	timeoutErrorMessage: '请求超时，请稍后再试',
	withCredentials: true,
	headers: {
		icode: '1E53900BEB862EDD'
	}
});

// 请求拦截器
instance.interceptors.request.use(
	config => {
		if (config.showLoading) showLoading();
		const token = storage.get('token');
		if (token) {
			// config.headers.Authorization = 'Bearer ' + token;
			config.headers.Authorization = 'Token:: ' + token;
		}
		// if (import.meta.env.VITE_MOCK) {
		// 	config.baseURL = import.meta.env.VITE_MOCK_API; // mock数据
		// } else {
		// 	config.baseURL = import.meta.env.VITE_BASE_API; // 真实数据
		// }
		if (env.mock) {
			config.baseURL = env.mockApi; // mock数据
		} else {
			config.baseURL = env.baseApi; // 真实数据
		}
		return {
			...config
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
instance.interceptors.response.use(
	response => {
		const data: Result = response.data;
		hideLoading();
		if (response.config.responseType === 'blob') return response;
		if (data.code === 50001) {
			message.error(data.msg);
			// storage.remove('token')
			// 如果登录失效了，就通过这样的方式跳转到登录页面，并携带返回页面的参数
			location.href = '/react-freight/login?callback=' + encodeURIComponent(location.href);
		} else if (data.code != 0) {
			if (response.config.showError === false) {
				return Promise.resolve(data);
			} else {
				message.error(data.msg);
				return Promise.reject(data);
			}
		}
		return data.data;
	},
	error => {
		hideLoading();
		message.error(error.message);
		return Promise.reject(error.message);
	}
);

interface IConfig {
	showLoading?: boolean;
	showError?: boolean;
}

export default {
	get<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
		return instance.get(url, { params, ...options });
	},
	post<T>(url: string, params?: object, options: IConfig = { showLoading: true, showError: true }): Promise<T> {
		return instance.post(url, params, options);
	},
	downloadFile(url: string, data: any, fileName = 'fileName.xlsx') {
		instance({
			url,
			data,
			method: 'post',
			responseType: 'blob'
		}).then(response => {
			const blob = new Blob([response.data], {
				type: response.data.type
			});
			const name = (response.headers['file-name'] as string) || fileName;
			const link = document.createElement('a');
			link.download = decodeURIComponent(name);
			link.href = URL.createObjectURL(blob);
			document.body.append(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(link.href);
		});
	}
	// post<T>(url: string, params?: object, options?: AxiosRequestConfig): Promise<T> {
	//   const axiosConfig: AxiosRequestConfig = {
	//     params,
	//     ...options,
	//   }
	//   return instance.post(url, null, axiosConfig)
	// },
};
