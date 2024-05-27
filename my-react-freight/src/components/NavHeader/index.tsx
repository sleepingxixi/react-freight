import { MenuFoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, MenuProps, Space, Switch } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import styles from './style.module.scss';

const NavHeader = () => {
	const breadcrumbItem: ItemType[] = [
		{
			title: '首页'
		},
		{
			title: <a href=''>工作台</a>
		}
	];
	const items: MenuProps['items'] = [
		{
			label: '邮箱：liping.smile@qq.com',
			key: '0'
		},
		{
			label: '退出登录',
			key: '1'
		}
	];

	return (
		<div className={styles.header}>
			<div className={styles.left}>
				<MenuFoldOutlined style={{ marginRight: 10 }} />
				<Breadcrumb items={breadcrumbItem} />
			</div>
			<div className={styles.right}>
				<Switch checkedChildren='暗黑' unCheckedChildren='默认' style={{ marginRight: 10 }} />
				<Dropdown menu={{ items }} trigger={['click']}>
					<div onClick={e => e.preventDefault()}>SmilePing</div>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavHeader;
