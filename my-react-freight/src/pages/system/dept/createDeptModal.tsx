import { Dept } from '@/types/api';
import { IAction, IModalProp } from '@/types/modal';
import { Modal, Form, TreeSelect, Input } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';
import Api from '@/api/index';

const CreateDeptModal = (props: IModalProp<Dept.DeptListData>) => {
	const [form] = Form.useForm();
	const [action] = useState<IAction>('create');
	const [visible, setVisible] = useState<boolean>(false);
	const [deptList, setDeptList] = useState<Dept.RequestDeptListParams[]>([]);
	const [allUserList, setAllUserList] = useState<Dept.AllUserData[]>([]);

	useEffect(() => {
		getAllUserList();
	}, []);

	const getDeptList = async () => {
		const data = await Api.getDeptListData();
		setDeptList(data.list);
	};

	const getAllUserList = async () => {
		const data = await Api.getAllUserList();
		setAllUserList(data);
	};

	const open = (type: IAction, data?: Dept.DeptListData) => {
		getDeptList();
		setVisible(true);
		if ((type === 'edit' || type === 'create') && data) {
			// TODO 初始化数据
			form.setFieldsValue(data);
		}
	};
	useImperativeHandle(
		props.mRef,
		() => {
			return {
				open
			};
		},
		[]
	);
	const handleOk = async () => {
		await form.validateFields();
		// TODO 提交数据
		setVisible(false);
		props.update();
	};

	const handleCancel = () => {
		setVisible(false);
		form.resetFields();
	};
	return (
		<Modal
			title={action === 'create' ? '新增部门' : '删除部门'}
			open={visible}
			okText='确定'
			cancelText='取消'
			closable={false}
			width={800}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Form form={form} labelCol={{ span: 4 }}>
				<Form.Item label='上级部门' name='parentId'>
					<TreeSelect
						placeholder='请选择上级部门'
						treeData={deptList}
						fieldNames={{ label: 'deptName', value: '_id' }}
						treeDefaultExpandAll
					/>
				</Form.Item>
				<Form.Item name='deptName' label='部门名称' required>
					<Input placeholder='请输入部门名称' />
				</Form.Item>
				<Form.Item name='userName' label='负责人' required>
					<TreeSelect
						placeholder='请选择负责人'
						treeData={allUserList}
						fieldNames={{ label: 'userName', value: 'userId' }}
						treeDefaultExpandAll
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default CreateDeptModal;
