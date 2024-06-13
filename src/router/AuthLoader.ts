import Api from '@/api';
import { getMenuPath } from '@/utils';
import { Menu } from '@/types/api';

export interface IAuthLoader {
	buttonList: string[];
	menuList: Menu.MenuItem[];
	menuPathList: string[];
}

export default async function AuthLoader() {
	// await Api.checkLogin();
	const data = await Api.getPermissionList();
	const menuPathList = getMenuPath(data.menuList);
	return {
		buttonList: data.buttonList,
		menuList: data.menuList,
		menuPathList
	};
}
