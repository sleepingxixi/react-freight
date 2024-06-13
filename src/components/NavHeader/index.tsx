import { MenuFoldOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Switch } from 'antd';
// import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import styles from './style.module.scss';
import { useUserInfo } from '@/stores';
import storage from '@/utils/storage';
import NewBreadCrumb from '../NewBreadCrumb/index';
import { useEffect } from 'react';

const NavHeader = () => {
  const state = useUserInfo();
  // const breadcrumbItem: ItemType[] = [
  // 	{
  // 		title: '首页'
  // 	},
  // 	{
  // 		title: '工作台'
  // 	}
  // ];
  useEffect(() => {
    handleSwitch(state.isDark);
  }, []);
  const items: MenuProps['items'] = [
    {
      label: `邮箱：${state.userInfo?.userEmail}`,
      key: 'email'
    },
    {
      label: '退出登录',
      key: 'logout'
    }
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      // 清除用户信息，然后退出到登录页面
      // TODO 清除token
      storage.remove('token');
      state.clearInfo();
      location.href = '/react-freight/login?callback=' + encodeURIComponent(location.href);
    }
  };
  const handleSwitch = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      document.documentElement.classList.remove('dark');
    }
    storage.set('isDark', isDark);
    state.updateTheme(isDark);
  };
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <MenuFoldOutlined style={{ marginRight: 10 }} />
        <NewBreadCrumb />
      </div>
      <div className={styles.right}>
        <Switch
          checked={state.isDark}
          checkedChildren='暗黑'
          unCheckedChildren='默认'
          style={{ marginRight: 10 }}
          onChange={(checked: boolean) => {
            handleSwitch(checked);
          }}
        />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <div onClick={e => e.preventDefault()}>{state.userInfo?.userName}</div>
        </Dropdown>
      </div>
    </div>
  );
};

export default NavHeader;
