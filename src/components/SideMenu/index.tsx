import { DesktopOutlined, MenuOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
// import * as icons from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import styles from './index.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logoUrl from '@/assets/imgs/logo.png';

// type MenuItem = Required<MenuProps>['items'][number];
type MenuItem = { key: string; icon?: React.ReactNode; label?: string; children?: MenuItem[] };
const items: MenuItem[] = [
  {
    key: '/dashboard',
    icon: <DesktopOutlined />,
    label: '工作台'
  },
  {
    key: '2',
    label: '系统管理',
    icon: <SettingOutlined />,
    children: [
      { key: '/userlist', label: '人员管理', icon: <TeamOutlined /> },
      // { key: '6', label: '菜单管理', icon: <MenuOutlined /> },
      // { key: '7', label: '角色管理', icon: <TeamOutlined /> },
      { key: '/deptList', label: '部门管理', icon: <MenuOutlined /> }
    ]
  }
  // {
  // 	key: '9',
  // 	label: '订单管理',
  // 	icon: <SettingOutlined />,
  // 	children: [
  // 		{ key: '10', label: '订单列表', icon: <TeamOutlined /> },
  // 		{ key: '11', label: '订单聚合', icon: <MenuOutlined /> },
  // 		{ key: '12', label: '司机列表', icon: <TeamOutlined /> }
  // 	]
  // }
];

const menuPrePathMap: Record<string, string[]> = {};
const get = (item: MenuItem, pre: string[]) => {
  menuPrePathMap[item.key] = pre;
  if (item.children && item.children.length > 0) {
    item.children.forEach(i => {
      get(i, [...pre, item.key]);
    });
  }
};
items.map(item => {
  get(item, []);
});

const SideMenu = () => {
  const navigate = useNavigate();
  const [selectMenu, setSelectMenu] = useState<string>('/welcome');
  const { pathname } = useLocation();
  // 通过递归，找出每一个key的所有展开路径，维护一个map
  useEffect(() => {
    setSelectMenu(pathname || '/welcome');
  }, [pathname]);
  const handleLogo = () => {
    navigate('/welcome');
  };

  const clickMenu: MenuProps['onClick'] = e => {
    setSelectMenu(e.key);
    navigate(e.key);
  };
  const onOpenChange = (openKeys: string[]) => {
    const menu = openKeys[openKeys.length - 1];
    setSelectMenu(menu);
  };
  return (
    <div style={{ width: 256 }}>
      <div className={styles['logo-view']} onClick={handleLogo}>
        <img src={logoUrl} alt='图标' className={styles.logo} />
        <div>平平货运</div>
      </div>

      <Menu
        onClick={clickMenu}
        selectedKeys={[selectMenu]}
        openKeys={[...(menuPrePathMap[selectMenu] || []), selectMenu]}
        mode='inline'
        theme='dark'
        onOpenChange={onOpenChange}
        // inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SideMenu;
