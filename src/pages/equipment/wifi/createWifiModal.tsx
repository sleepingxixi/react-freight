import { Equipment } from '@/types/api';
import { IAction, IWifiProp } from '@/types/modal';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal } from 'antd';
import { useImperativeHandle, useState } from 'react';
import Api from '@/api/index';

const CreateWifiModal = (props: IWifiProp) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState<boolean>(false);
	const [action, setAction] = useState<IAction>();
	// const [loading, setLoading] = useState(false);

	// 调用弹窗显示方法
	const open = (type: IAction, data?: Equipment.Wifi) => {
		setAction(type);
		setVisible(true);
		if (type === 'edit' && data) {
			form.setFieldsValue(data);
		}
	};
	// 暴露子组件方法
	useImperativeHandle(props.mRef, () => {
		return {
			open
		};
	});

	const handleOk = async () => {
		console.log('提交');
		try {
			await form.validateFields();
			const submitData = form.getFieldsValue();
			if (action === 'edit') {
				const data = await Api.editWifiData(submitData);
				if (data.data === true) {
					message.success('更新成功');
				} else {
					message.error('更新失败');
				}
			}
			if (action === 'create') {
				const data = await Api.createWifiData(submitData);
				if (data.data === true) {
					message.success('创建成功');
				} else {
					message.error('创建失败');
				}
			}
			handleCancel();
			setVisible(false);
			props.update();
		} catch (err) {
			message.error('操作失败');
		}
	};

	const handleCancel = () => {
		setVisible(false);
		form.resetFields();
	};

	return (
		<Modal
			width={800}
			title={`${action === 'create' ? '创建wifi' : '编辑wifi'}`}
			open={visible}
			okText='确认'
			cancelText='取消'
			onOk={handleOk}
			closable={false}
			onCancel={handleCancel}
		>
			<Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
				{/* 这里放一个隐藏的字段，为了便于后续提交 */}
				<Form.Item name='id' hidden>
					<Input />
				</Form.Item>
				<Form.Item
					name='name'
					label='描述'
					required
					rules={[
						{
							required: true,
							message: '请输入wifi描述'
						}
					]}
				>
					<Input placeholder='请输入wifi描述' />
				</Form.Item>
				<Form.Item
					name='ssid'
					label='ssid'
					required
					rules={[
						{
							required: true,
							message: '请输入wifi名称'
						}
					]}
				>
					<Input placeholder='请输入wifi名称' />
				</Form.Item>
				<Form.Item
					name='password'
					label='wifi密码'
					required
					rules={[
						{
							required: true,
							message: '请输入wifi密码'
						}
					]}
				>
					<Input placeholder='请输入wifi密码' />
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default CreateWifiModal;
