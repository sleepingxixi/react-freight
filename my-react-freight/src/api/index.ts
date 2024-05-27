// import request from '@/utils/request';
import { Login } from '@/types/api';
import { delay } from '@/utils';

export default {
	login(params: Login.params) {
		// return request.post('/users/login', params, { showLoading: false });
		// return request.post('/users/login', params);
		// 设置假数据
		const mockRequest = () => {
			return { code: 0, data: '123' };
		};
		return delay(mockRequest, 3000);
	}
};
