import { Button, Form, Input } from 'antd';
import styles from './index.module.scss';
const Login = () => {
	const onFinish = () => {};
	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginWrapper}>
				<div className={styles.title}>登录页面</div>
				<Form
					name='basic'
					// wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete='off'
				>
					<Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
						<Input placeholder='请输入用户名' />
					</Form.Item>

					<Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
						<Input.Password placeholder='请输入密码' />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' block>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};
export default Login;
