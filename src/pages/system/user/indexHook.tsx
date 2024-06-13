/**
 * 声明一下，这个文件使用了useAntdTable进行优化，并不是一个hooks的文件。
 */
import { Button, Form, Input, Modal, Select, Space, Table, TableColumnsType, message } from 'antd';
import { User } from '@/types/api';
import { useRef, useState } from 'react';
import Api from '@/api/index';
import { formatDate } from '@/utils';
import CreateUserModal from './createUserModal';
import { IAction } from '@/types/modal';
// import modal from 'antd/es/modal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';

//TODO 需要重新完善接口，支持分页，搜索等功能

const UserListHook = () => {
	const [form] = Form.useForm<User.RequestUserListParams>();
	const [modal, contextHolder] = Modal.useModal();
	const userRef = useRef<{
		open: (type: IAction, data?: User.UserList) => void;
	}>();
	// const [listData, setListData] = useState<User.UserList[]>();
	// 设置已经勾选的项
	const [selectIds, setSelectIds] = useState<number[]>([]);
	// 设置分页字段
	// const [pagination, setPagination] = useState<{ current?: number; pageSize?: number; total?: number }>({
	// 	current: 1,
	// 	pageSize: 10,
	// 	total: 0
	// });
	const columns: TableColumnsType<User.UserList> = [
		{
			title: '用户ID',
			dataIndex: 'userId',
			key: 'userId'
		},
		{
			title: '用户名称',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: '用户邮箱',
			dataIndex: 'userEmail',
			key: 'userEmail'
		},
		{
			title: '用户角色',
			dataIndex: 'role',
			key: 'role',
			render: (role: number) => {
				return { 0: '超级管理员', 1: '管理员', 2: '试用管理员', 3: '普通用户' }[role];
			}
		},
		{
			title: '用户状态',
			dataIndex: 'state',
			key: 'state',
			render: (text: number) => {
				return { 1: '在职', 2: '试用期', 3: '离职' }[text];
			}
		},
		{
			title: '注册时间',
			dataIndex: 'createTime',
			key: 'createTime',
			render: text => {
				return formatDate(text);
			}
		},
		{
			title: '最后登录时间',
			dataIndex: 'lastLoginTime',
			key: 'lastLoginTime',
			render: text => {
				return formatDate(text);
			}
		},
		{
			title: '操作',
			key: 'handle',
			// 如果有dataIndex，则render的第一个参数就是这个字段对应的结果，如果没有，则第一个字段直接返回一整行的数据
			render: record => {
				return (
					<Space>
						<Button
							type='link'
							key='edit'
							onClick={() => {
								handleEdit(record);
							}}
						>
							编辑
						</Button>
						<Button
							type='text'
							key='delete'
							danger
							onClick={() => {
								handleDelete(record);
							}}
						>
							删除
						</Button>
					</Space>
				);
			}
		}
	];

	// useEffect(() => {
	// 	getUserList({ pageNum: pagination.current, pageSize: pagination.pageSize });
	// }, [pagination.current, pagination.pageSize]);

	// const getUserList = async (params?: User.RequestUserListParams) => {
	// 	const values = form.getFieldsValue();
	// 	const data = await Api.getUserListData({ ...values, ...params, pageSize: params?.pageSize || pagination.pageSize });
	// 	setListData(data.list);
	// 	setPagination({ ...data.page, current: data.page.pageNum });
	// };

	const getTableData = (
		{ current, pageSize }: { current: number; pageSize: number },
		formData: User.RequestUserListParams
	): Promise<{
		total: number;
		list: User.UserList[];
	}> => {
		return Api.getUserListData({ ...formData, pageNum: current, pageSize }).then(res => ({
			total: res.page.total || 0,
			list: res.list
		}));
	};
	const { tableProps, search } = useAntdTable(getTableData, {
		defaultPageSize: 10,

		form
	});
	const handleConfirm = () => {
		// getUserList({ pageNum: 1 });
		search.submit();
	};

	const handleReset = () => {
		// form.resetFields();
		search.reset();
	};

	// const paginationChange = (page: number, pageSize: number) => {
	// 	console.log('paginationChange==', page, pageSize);
	// 	setPagination({ ...pagination, current: page, pageSize });
	// };

	const createUser = () => {
		userRef.current?.open('create');
	};

	const handleEdit = (data: User.UserList) => {
		userRef.current?.open('edit', data);
	};
	const handleDelete = (data: User.UserList) => {
		modal.confirm({
			title: '删除提示',
			icon: <ExclamationCircleOutlined />,
			content: `确认删除【${data.userId} ${data.userName}】用户吗？`,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				// deleteUser(data, event);
				return new Promise(resolve => {
					resolve(deleteUser(data));
				});
			}
		});
	};

	const deleteUser = async (data: User.UserList) => {
		// TODO 调用接口，删除用户
		console.log('data==', data);
		// getUserList({ pageNum: 1 });
		search.submit();
	};

	const batchDelete = () => {
		if (selectIds.length == 0) {
			return message.error('请选择需要删除的数据');
		}
		modal.confirm({
			title: '批量删除提示',
			icon: <ExclamationCircleOutlined />,
			content: `确认批量删除用户吗？`,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				return new Promise(resolve => {
					resolve(batchDeleteUser());
				});
			}
		});
	};

	const batchDeleteUser = () => {
		// TODO 调用接口，批量删除用户
		console.log('patchDeleteData==', selectIds);
		// 更新数据
		// getUserList({ pageNum: 1 });
		search.submit();
		setSelectIds([]);
	};

	const selectRowData = (data: number[]) => {
		console.log('selectData=', data);
		setSelectIds(data);
	};
	return (
		<>
			<div className='page-search-form'>
				<Form layout='inline' form={form} initialValues={{ state: 1 }}>
					<Form.Item label='用户ID' name='userId'>
						<Input placeholder='请输入用户ID' />
					</Form.Item>
					<Form.Item label='用户名' name='userName'>
						<Input placeholder='请输入用户名' />
					</Form.Item>
					<Form.Item label='状态' name='state'>
						<Select style={{ width: 120 }}>
							<Select.Option value={1}>在职</Select.Option>
							<Select.Option value={2}>试用期</Select.Option>
							<Select.Option value={3}>离职</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<Button key='confirm' type='primary' onClick={handleConfirm}>
							确认
						</Button>
						<Button key='reset' onClick={handleReset}>
							重置
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div className='page-table-content'>
				<div className='header'>
					<div className='title'>用户列表</div>
					<div className='handle'>
						<Button type='primary' onClick={createUser}>
							新增
						</Button>
						<Button type='primary' danger onClick={batchDelete}>
							批量删除
						</Button>
					</div>
				</div>
				<Table
					// rowKey标识每一行的唯一标识
					rowKey='userId'
					rowSelection={{
						type: 'checkbox',
						// 指定目前选中的项，
						selectedRowKeys: selectIds,
						onChange: (keyList: React.Key[]) => {
							selectRowData(keyList as number[]);
						}
					}}
					columns={columns}
					{...tableProps}
					// 可以在hooks的基础上，自定义分页属性
					pagination={{
						...tableProps.pagination,
						showTotal: total => `共 ${total} 条`
					}}
				/>
			</div>
			<CreateUserModal
				mRef={userRef}
				update={() => {
					// getUserList({
					// 	pageNum: 1
					// });
					search.submit();
				}}
			/>
			{contextHolder}
		</>
	);
};
export default UserListHook;
