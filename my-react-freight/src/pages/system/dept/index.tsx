import { Dept } from '@/types/api';
import { Button, Form, Input, Modal, Space, Table, TableColumnsType } from 'antd';
import Api from '@/api/index';
import { useAntdTable } from 'ahooks';
import { formatDate } from '@/utils';
import CreateDeptModal from './createDeptModal';
import { useRef } from 'react';
import { IAction } from '@/types/modal';
import AuthButton from '@/components/AuthButton';
import SearchForm from '@/components/SearchForm';

const DepartmentList = () => {
	const [form] = Form.useForm();
	const ref = useRef<{
		open: (type: IAction, data?: Dept.DeptListData) => void;
	}>();
	const [modal, contextHolder] = Modal.useModal();
	const columns: TableColumnsType<Dept.DeptListData> = [
		{
			title: '部门名称',
			dataIndex: 'deptName',
			key: 'deptName'
		},
		{
			title: '负责人',
			dataIndex: 'userName',
			key: 'userName'
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			key: 'updateTime',
			render: text => {
				return formatDate(text);
			}
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			render: text => {
				return formatDate(text);
			}
		},
		{
			title: '操作',
			key: 'handle',
			// 如果有dataIndex，则render的第一个参数就是这个字段对应的结果，如果没有，则第一个字段直接返回一整行的数据
			render: (_, record) => {
				return (
					<Space>
						<Button
							type='text'
							key='create'
							onClick={() => {
								handleCreate(record);
							}}
						>
							新增
						</Button>
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
	const getTableData = (
		{ current, pageSize }: { current: number; pageSize: number },
		formData: Dept.DeptData
	): Promise<{
		total: number;
		list: Dept.DeptListData[];
	}> => {
		return Api.getDeptListData({ ...formData, pageNum: current, pageSize }).then(res => ({
			total: res.page.total || 0,
			list: res.list
		}));
	};
	const { tableProps, search, params } = useAntdTable(getTableData, {
		defaultPageSize: 10,
		form
	});

	// const handleConfirm = () => {
	// 	search.submit();
	// };

	// const handleReset = () => {
	// 	search.reset();
	// };

	const handleCreate = (data?: Dept.DeptListData) => {
		ref.current?.open('create', { parentId: data?.parentId });
	};
	const handleEdit = (data?: Dept.DeptListData) => {
		ref.current?.open('edit', data);
	};
	const handleDelete = (data?: Dept.DeptListData) => {
		modal.confirm({
			okText: '确定',
			cancelText: '取消',
			content: '确定删除这行数据吗',
			title: '删除确认'
		});
	};
	return (
		<>
			<SearchForm form={form} submit={search.submit} reset={search.reset}>
				<Form.Item label='部门名称' name='deptName'>
					<Input placeholder='请输入部门名称' />
				</Form.Item>
			</SearchForm>
			<div className='page-table-content'>
				<div className='header'>
					<div className='title'>部门列表</div>
					<div className='handle'>
						{/* 假设这个按钮是需要'driverList@query'权限才可以展示 */}
						<AuthButton
							auth='driverList@query'
							type='primary'
							onClick={() => {
								handleCreate();
							}}
						>
							新增
						</AuthButton>
					</div>
				</div>
				<Table
					// rowKey标识每一行的唯一标识
					rowKey='_id'
					columns={columns}
					{...tableProps}
					// 可以在hooks的基础上，自定义分页属性
					pagination={{
						...tableProps.pagination,
						showTotal: total => `共 ${total} 条`
					}}
				/>
			</div>
			{contextHolder}
			<CreateDeptModal mRef={ref} update={search.submit} />
		</>
	);
};
export default DepartmentList;
