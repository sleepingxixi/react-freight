import { Button, Form, Input, message } from 'antd';
import styles from './index.module.scss';
import Api from '@/api/index';
import storage from '@/utils/storage';
import { Login } from '@/types/api';
import { useState } from 'react';
// import { useUserInfo } from '@/stores';
const LoginFC = () => {
  // const { userInfo } = useUserInfo(state => ({
  // 	userInfo: state.userInfo
  // }));
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true);
      // 请求接口提交信息
      console.log(values);
      const data: any = await Api.login(values);
      setLoading(false);
      if (data.code !== 0) {
        return message.error('登录失败');
      }
      // 如果登录成功，存储token，跳转到对应的页面
      storage.set('token', data.data['access_token']);
      message.success('登录成功');
      // 通过下方的方式能够获取到url携带的query参数
      const params = new URLSearchParams(location.search);
      location.href = params.get('callback') || '/';
    } catch (error) {
      setLoading(false);
    }
  };
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
          <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default LoginFC;
