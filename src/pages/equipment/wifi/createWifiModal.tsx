import { User } from '@/types/api';
import { IAction, IWifiProp } from '@/types/modal';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { useImperativeHandle, useState } from 'react';


const CreateWifiModal = (props: IWifiProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [action, setAction] = useState<IAction>();
  const [loading, setLoading] = useState(false);


  // 调用弹窗显示方法
  const open = (type: IAction, data?: User.UserList) => {
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
        <Form.Item name='wifiId' hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='wifi名称'
          required
          rules={[
            {
              required: true,
              message: '请输入wifi名'
            }
          ]}
        >
          <Input placeholder='请输入wifi名' />
        </Form.Item>
        <Form.Item
          name='ssid'
          label='ssid'
          required
          rules={[
            {
              required: true,
              message: '请输入ssid'
            }
          ]}
        >
          <Input placeholder='请输入ssid' />
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
