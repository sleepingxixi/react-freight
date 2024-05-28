// import request from '@/utils/request';
import { Login, User } from '@/types/api';
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
	},

	getUserInfo(): Promise<User.UserInfo> {
		const mockRequest = () => {
			return {
				userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				_id: '655da3bf9d9a408c7dd73212',
				userId: 1000016,
				userName: 'smilePing',
				userEmail: 'simlePing@qq.com',
				mobile: '18100001111',
				deptId: '',
				deptName: '',
				job: '前端工程师',
				state: 1,
				role: 2,
				createId: 1000002,
				roleList: '655dbedb11c02c8597dce76f'
			};
		};
		return delay(mockRequest, 3000);
	}
};
