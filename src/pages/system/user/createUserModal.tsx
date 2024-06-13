import { User } from '@/types/api';
import { IAction, IModalProp } from '@/types/modal';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, GetProp, Input, Modal, Select, Upload, UploadProps, message } from 'antd';
import { useImperativeHandle, useState } from 'react';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result as string));
	reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('只能输入 JPG/PNG 文件');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('图片大小不能超过 2MB!');
	}
	return isJpgOrPng && isLt2M;
};

const CreateUserModal = (props: IModalProp) => {
	const [form] = Form.useForm();
	const [visible, setVisible] = useState<boolean>(false);
	const [action, setAction] = useState<IAction>();
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<string>();

	const handleChange: UploadProps['onChange'] = info => {
		if (info.file.status === 'uploading') {
			setLoading(true);
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj as FileType, url => {
				setLoading(false);
				setImageUrl(url);
			});
		}
	};

	// 调用弹窗显示方法
	const open = (type: IAction, data?: User.UserList) => {
		setAction(type);
		setVisible(true);
		if (type === 'edit' && data) {
			form.setFieldsValue(data);
			setImageUrl(data.userImg);
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
			if (action === 'edit') {
				// TODO调用接口，编辑用户
			}
			if (action === 'create') {
				// TODO调用接口，创建用户
			}
			handleCancel();
			setVisible(false);
			// props.update()
		} catch (err) {
			console.log(err);
		}
	};

	const handleCancel = () => {
		setVisible(false);
		setImageUrl('');
		form.resetFields();
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type='button'>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>上传图片</div>
		</button>
	);
	return (
		<Modal
			width={800}
			title={`${action === 'create' ? '创建用户' : '编辑用户'}`}
			open={visible}
			okText='确认'
			cancelText='取消'
			onOk={handleOk}
			closable={false}
			onCancel={handleCancel}
		>
			<Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
				{/* 这里放一个隐藏的字段，为了便于后续提交 */}
				<Form.Item name='userId' hidden>
					<Input />
				</Form.Item>
				<Form.Item
					name='userName'
					label='用户名称'
					required
					rules={[
						{
							required: true,
							message: '请输入用户名'
						},
						{
							min: 5,
							max: 12,
							message: '最少5个字符，最多12个字符'
						}
					]}
				>
					<Input placeholder='请输入用户名' />
				</Form.Item>
				<Form.Item
					name='userEmail'
					label='邮箱'
					required
					rules={[
						{
							required: true,
							message: '请输入邮箱'
						},
						{ type: 'email', message: '请输入正确的邮箱' },
						{ pattern: /^\w+@qq.com$/, message: '邮箱必须以@qq.com结尾' }
					]}
				>
					<Input placeholder='请输入邮箱' />
				</Form.Item>
				<Form.Item
					name='mobile'
					label='手机号'
					rules={[
						{ len: 11, message: '手机号必须是11位数字' },
						{ pattern: /1[1-9]\d{9}/, message: '请输入以1开头的11位手机号' }
					]}
				>
					<Input placeholder='请输入手机号' type='number' />
				</Form.Item>
				<Form.Item
					name='deptName'
					label='部门'
					required
					rules={[
						{
							required: true,
							message: '请输入部门'
						}
					]}
				>
					<Input placeholder='请输入部门' />
				</Form.Item>
				<Form.Item name='job' label='岗位'>
					<Input placeholder='请输入岗位' />
				</Form.Item>
				<Form.Item name='state' label='状态'>
					<Select>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>试用期</Select.Option>
						<Select.Option value={3}>离职</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name='role' label='系统角色'>
					<Select>
						<Select.Option value={1}>产品</Select.Option>
						<Select.Option value={2}>技术</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item name='img' label='头像上传'>
					<Upload
						name='avatar'
						listType='picture-circle'
						className='avatar-uploader'
						showUploadList={false}
						// 这个接口是antd的上传接口，应该是做了校验的，不能随便使用，只是单纯的设置，并没有调用
						action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
						beforeUpload={beforeUpload}
						onChange={handleChange}
					>
						{imageUrl ? (
							<img src={imageUrl} alt='avatar' style={{ width: '100%', borderRadius: '100%' }} />
						) : (
							uploadButton
						)}
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};
export default CreateUserModal;
