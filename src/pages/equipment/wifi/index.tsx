import { Button, Modal, Space, Table, TableColumnsType, message } from 'antd';
// import styles from './index.module.scss';
import { Equipment } from '@/types/api';
import { useEffect, useRef, useState } from 'react';
import Api from '@/api/index';
import { formatDate } from '@/utils';
import CreateWifiModal from './createWifiModal';
import { IAction } from '@/types/modal';
// import modal from 'antd/es/modal';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//TODO 需要重新完善接口，支持分页，搜索等功能

const UserList = () => {
  const [modal, contextHolder] = Modal.useModal();
  const userRef = useRef<{
    open: (type: IAction, data?: Equipment.Wifi) => void;
  }>();
  const [listData, setListData] = useState<Equipment.Wifi[]>();
  // 设置已经勾选的项
  const [selectIds, setSelectIds] = useState<number[]>([]);
  const columns: TableColumnsType<Equipment.Wifi> = [
    {
      title: 'wifi名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ssid',
      dataIndex: 'ssid',
      key: 'ssid'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
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
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
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

  useEffect(() => {
    getWifiList();
  }, []);

  const getWifiList = async () => {
    const data = await Api.getWifiListData();
    setListData(data.list);
  };
  const createUser = () => {
    userRef.current?.open('create');
  };

  const handleEdit = (data: Equipment.Wifi) => {
    userRef.current?.open('edit', data);
  };
  const handleDelete = (data: Equipment.Wifi) => {
    modal.confirm({
      title: '删除提示',
      icon: <ExclamationCircleOutlined />,
      content: `确认删除wifi【${data.name}】吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: data => {
        deleteUser(data);
      }
    });
  };

  const deleteUser = (data: Equipment.Wifi) => {
    // TODO 调用接口，删除用户
    console.log('data==', data);
    // 更新数据
    getWifiList();
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
        batchDeleteUser();
      }
    });
  };

  const batchDeleteUser = () => {
    // TODO 调用接口，批量删除用户
    console.log('patchDeleteData==', selectIds);
    // 更新数据
    getWifiList();
    setSelectIds([]);
  };

  const selectRowData = (data: number[]) => {
    console.log('selectData=', data);
    setSelectIds(data);
  };
  return (
    <>
      <div className='page-table-content'>
        <div className='header'>
          <div className='title'>wifi列表</div>
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
          dataSource={listData}
          rowSelection={{
            type: 'checkbox',
            // 指定目前选中的项，
            selectedRowKeys: selectIds,
            onChange: (keyList: React.Key[]) => {
              selectRowData(keyList as number[]);
            }
          }}
          columns={columns}
        />
      </div>
      <CreateWifiModal
        mRef={userRef}
        update={() => {
          getWifiList()
        }}
      />
      {contextHolder}
    </>
  );
};
export default UserList;
