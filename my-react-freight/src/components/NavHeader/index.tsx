import { MenuFoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, MenuProps, Space, Switch } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import styles from './style.module.scss';
import { useUserInfo } from '@/stores';
import storage from '@/utils/storage';

const NavHeader = () => {
	const state = useUserInfo();
	const breadcrumbItem: ItemType[] = [
		{
			title: '首页'
		},
		{
			title: '工作台'
		}
	];
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
			location.href = '/login?callback=' + encodeURIComponent(location.href);
		}
	};

	return (
		<div className={styles.header}>
			<div className={styles.left}>
				<MenuFoldOutlined style={{ marginRight: 10 }} />
				<Breadcrumb items={breadcrumbItem} />
			</div>
			<div className={styles.right}>
				<Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
				<Dropdown menu={{ items, onClick }} trigger={['click']}>
					<div onClick={e => e.preventDefault()}>{state.userInfo?.userName}</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavHeader;
