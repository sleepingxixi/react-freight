// import request from '@/utils/request';
import { Login, User, Report, Dept, Menu } from '@/types/api';
import { delay } from '@/utils';

export default {
	login(params: Login.params) {
		// return request.post('/users/login', params, { showLoading: false });
		// return request.post('/users/login', params);
		// 设置假数据
		const mockRequest = () => {
			return { code: 0, data: '123' };
		};
		return delay(mockRequest, 1000);
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
				deptName: '大前端',
				job: '前端工程师',
				state: 1,
				role: 2,
				createId: 1000002,
				roleList: '655dbedb11c02c8597dce76f'
			};
		};
		return delay(mockRequest, 1000);
	},

	getReportData(): Promise<Report.ReportData> {
		const mockRequest = () => {
			return {
				driverCount: 278600,
				totalMoney: 3984200,
				orderCount: 1306000,
				cityNum: 80
			};
		};
		return delay(mockRequest, 1000);
	},

	getLineData(): Promise<Report.LineData> {
		const mockRequest = () => {
			return {
				label: ['6月', '7月', '8月', '9月', '10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月'],
				order: [961, 794, 579, 224, 895, 692, 278, 643, 827, 444, 673, 175],
				money: [501, 908, 652, 845, 886, 95, 528, 969, 187, 868, 85, 336]
			};
		};
		return delay(mockRequest, 1000);
	},

	getUserListData(params?: User.RequestUserListParams): Promise<User.UserListData> {
		const requestParams = {
			pageSize: params?.pageSize || 10,
			pageNum: params?.pageNum || 1,
			userId: params?.userId,
			userName: params?.userName,
			state: params?.state
		};
		console.log('requestParams==', requestParams);
		const mockRequest = () => {
			return {
				page: {
					pageNum: 1,
					pageSize: 10,
					total: 10
				},
				list: [
					{
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T10:44:25.532Z',
						userId: 1000016,
						userName: 'JackMa',
						userEmail: 'jackma@mars.com',
						mobile: '17011221122',
						sex: 0,
						deptId: '',
						deptName: '',
						job: '前端工程师',
						state: 1,
						role: 2,
						createId: 1000002,
						lastLoginTime: '2024-05-29T04:20:33.560Z',
						roleList: '655dbedb11c02c8597dce76f'
					},
					{
						userId: 100017,
						userName: 'JackBean',
						userEmail: 'jackbean@mars.com',
						deptId: '655dbef811c02c8597dce77a',
						deptName: '大前端',
						state: 1,
						role: 1,
						roleList: '655dbedb11c02c8597dce76f',
						createId: 1000002,
						userImg: '',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2023-11-22T09:21:22.314Z',
						__v: 0
					},
					{
						userId: 100018,
						userName: '9549587',
						userEmail: '9549587@mars.com',
						deptId: '',
						deptName: '',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'http://api-driver.marsview.cc/3f9393c68f57ac57704652f00.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-03-05T07:18:46.815Z',
						__v: 0,
						job: '测试'
					},
					{
						userId: 100020,
						userName: '1366143860',
						userEmail: '1366143860@mars.com',
						deptId: '6568c7254a54800ac8d5b18e',
						deptName: '部门5',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-04-14T07:12:57.797Z',
						mobile: '13072361279',
						job: '前端1'
					},
					{
						userId: 100022,
						userName: '413401333',
						userEmail: '413401333@mars.com',
						deptId: '6582ae994a54800ac8d76b80',
						deptName: '前端',
						state: 1,
						role: 1,
						roleList: '6582aeb44a54800ac8d76b88',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-01-02T02:16:53.036Z',
						job: '前端'
					},
					{
						userId: 100023,
						userName: '1050732226',
						userEmail: '1050732226@mars.com',
						deptId: '',
						deptName: '大前端',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-03-08T08:33:42.675Z'
					},
					{
						userId: 100024,
						userName: '191337035',
						userEmail: '191337035@mars.com',
						deptId: '',
						deptName: '大前端',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-05-29T02:02:06.830Z'
					},
					{
						userId: 100025,
						userName: '717210290',
						userEmail: '717210290@mars.com',
						deptId: '',
						deptName: '大前端',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-03-08T08:34:03.303Z'
					},
					{
						userId: 100027,
						userName: '475721797',
						userEmail: '475721797@mars.com',
						deptId: '65eacdb84a54800ac8dd6183',
						deptName: '2312312',
						state: 1,
						role: 1,
						roleList: '65eaeafb4a54800ac8dd6429',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-03-22T04:55:23.057Z'
					},
					{
						userId: 100028,
						userName: '1667519970',
						userEmail: '1667519970@mars.com',
						deptId: '',
						deptName: '大前端',
						state: 1,
						role: 1,
						roleList: '',
						createId: 1000002,
						userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
						createTime: '2023-11-22T08:52:47.963Z',
						lastLoginTime: '2024-03-08T08:32:18.779Z'
					}
				]
			};
		};
		return delay(mockRequest, 1000);
	},

	getDeptListData(params?: Dept.RequestDeptListParams): Promise<Dept.DeptData> {
		const requestParams = {
			pageSize: params?.pageSize || 10,
			pageNum: params?.pageNum || 1,
			deptName: params?.deptName
		};
		console.log('requestParams==', requestParams);
		const mockRequest = () => {
			return {
				list: [
					{
						_id: '655dbeee11c02c8597dce776',
						deptName: '技术中心',
						userName: 'admin',
						parentId: '',
						createId: 1000002,
						updateTime: '2023-11-22T08:23:39.919Z',
						createTime: '2023-11-22T08:23:39.919Z',
						__v: 0,
						children: [
							{
								_id: '655dbef811c02c8597dce77a',
								deptName: '大前端',
								userName: 'Jack',
								parentId: '655dbeee11c02c8597dce776',
								createId: 1000002,
								updateTime: '2023-11-22T08:23:39.919Z',
								createTime: '2023-11-22T08:23:39.919Z',
								__v: 0
							},
							{
								_id: '655dc06811c02c8597dce7ae',
								deptName: '测试部门',
								userName: 'Jack',
								parentId: '655dbeee11c02c8597dce776',
								createId: 1000002,
								updateTime: '2023-11-22T08:48:49.920Z',
								createTime: '2023-11-22T08:23:39.919Z',
								__v: 0
							},
							{
								_id: '655dc07e11c02c8597dce7b5',
								deptName: '产品中心',
								userName: 'Jack',
								parentId: '655dbeee11c02c8597dce776',
								createId: 1000002,
								updateTime: '2023-11-22T08:23:39.919Z',
								createTime: '2023-11-22T08:23:39.919Z',
								__v: 0
							},
							{
								_id: '655dc08911c02c8597dce7b9',
								deptName: '营销中心',
								userName: 'Jack',
								parentId: '655dbeee11c02c8597dce776',
								createId: 1000002,
								updateTime: '2023-11-22T08:23:39.919Z',
								createTime: '2023-11-22T08:23:39.919Z',
								__v: 0
							},
							{
								_id: '655dc09311c02c8597dce7bd',
								deptName: '增长中心',
								userName: 'Jack',
								parentId: '655dbeee11c02c8597dce776',
								createId: 1000002,
								updateTime: '2023-11-22T08:23:39.919Z',
								createTime: '2023-11-22T08:23:39.919Z',
								__v: 0
							}
						]
					}
				],
				page: {
					pageNum: 1,
					pageSize: 10,
					total: 1
				}
			};
		};
		return delay(mockRequest, 1000);
	},
	getAllUserList(): Promise<Dept.AllUserData[]> {
		const mockRequest = () => {
			return [
				{
					_id: '655da3bf9d9a408c7dd73212',
					userId: 1000016,
					userName: 'JackMa',
					userEmail: 'jackma@mars.com'
				},
				{
					_id: '655dbdb113ca5a39c96af23c',
					userId: 1000002,
					userName: 'admin',
					userEmail: 'admin@mars.com'
				},
				{
					_id: '655dc448d4dc6d6fda15db92',
					userId: 100017,
					userName: 'JackBean',
					userEmail: 'jackbean@mars.com'
				}
			];
		};
		return delay(mockRequest, 1000);
	},
	// 获取权限列表
	getPermissionList(): Promise<{ buttonList: string[]; menuList: Menu.MenuItem[] }> {
		const mockRequest = () => {
			return {
				menuList: [
					{
						_id: '655db45ff10762608048caec',
						menuType: 1,
						menuName: '工作台',
						path: '/dashboard',
						icon: 'DesktopOutlined',
						orderBy: 0,
						menuState: 1,
						parentId: '',
						createId: 1000002,
						createTime: '2023-11-22T07:50:59.931Z',
						updateTime: '2023-11-22T08:27:07.828Z',
						__v: 0,
						children: [
							{
								_id: '655db4a4f10762608048caf4',
								menuType: 2,
								menuName: '查看',
								menuCode: 'home@query',
								orderBy: 0,
								menuState: 1,
								parentId: '655db45ff10762608048caec',
								createId: 1000002,
								createTime: '2023-11-22T07:50:59.931Z',
								updateTime: '2023-11-22T07:50:59.931Z',
								__v: 0
							}
						],
						buttons: [
							{
								_id: '655db4a4f10762608048caf4',
								menuType: 2,
								menuName: '查看',
								menuCode: 'home@query',
								orderBy: 0,
								menuState: 1,
								parentId: '655db45ff10762608048caec',
								createId: 1000002,
								createTime: '2023-11-22T07:50:59.931Z',
								updateTime: '2023-11-22T07:50:59.931Z',
								__v: 0
							}
						]
					},
					{
						_id: '655db45ff10762608048caec1',
						menuType: 1,
						menuName: '系统管理',
						path: '2',
						icon: 'DesktopOutlined',
						orderBy: 0,
						menuState: 1,
						parentId: '',
						createId: 1000002,
						createTime: '2023-11-22T07:50:59.931Z',
						updateTime: '2023-11-22T08:27:07.828Z',
						__v: 0,
						children: [
							{
								_id: '655db4a4f10762608048caf4',
								menuType: 1,
								path: '/userlist',
								menuName: '人员管理',
								menuCode: 'home@query',
								orderBy: 0,
								menuState: 1,
								parentId: '655db45ff10762608048caec',
								createId: 1000002,
								createTime: '2023-11-22T07:50:59.931Z',
								updateTime: '2023-11-22T07:50:59.931Z',
								__v: 0
							},
							{
								_id: '655db4a4f10762608048caf4',
								menuType: 1,
								path: '/deptList',
								menuName: '部门管理',
								menuCode: 'home@query',
								orderBy: 0,
								menuState: 1,
								parentId: '655db45ff10762608048caec',
								createId: 1000002,
								createTime: '2023-11-22T07:50:59.931Z',
								updateTime: '2023-11-22T07:50:59.931Z',
								__v: 0
							}
						]
					}
				],
				buttonList: [
					'driverList@query',
					'cluster@query',
					'order@detail',
					'order@point',
					'order@route',
					'order@delete',
					'dept@query',
					'dept@create',
					'dept@edit',
					'dept@delete',
					'role@query',
					'role@edit',
					'role@setting',
					'role@delete',
					'menu@queyr',
					'menu@create',
					'menu@edit',
					'menu@delete',
					'user@query',
					'user@create',
					'user@edit',
					'user@delete',
					'home@query'
				]
			};
		};
		return delay(mockRequest, 1000);
	}
};
