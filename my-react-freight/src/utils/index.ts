import { Menu } from '@/types/api';

// 延迟几秒后执行
export const delay = <T>(fn: any, time: number, ...args: any) => {
	return new Promise<T>(resolve => {
		return setTimeout(() => {
			Promise.resolve(fn(...args)).then(resolve);
		}, time);
	});
};

// 等待几秒
export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// 格式化金额
export const formatMoney = (num?: number | string) => {
	if (!num) {
		return 0;
	}
	const newNum = parseFloat(num.toString());
	return newNum.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
};

export const formatNum = (num?: number | string) => {
	if (!num) {
		return 0;
	}
	const newNum = num.toString();
	if (newNum.indexOf('.') > -1) {
		return newNum.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	} else {
		return newNum.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}
};

// 格式化时间
export const toLocalDate = (date?: Date, rule?: string) => {
	let curDate = new Date();
	if (date) curDate = date;
	if (rule === 'yyyy-MM-dd') {
		return curDate.toLocaleDateString().replaceAll('/', '-');
	}
	if (rule === 'HH:mm:ss') {
		return curDate.toLocaleTimeString().replaceAll('/', '-');
	}
	return curDate.toLocaleString().replaceAll('/', '-');
};

// 格式化日期
export const formatDate = (date?: Date | string, rule?: string) => {
	let curDate = new Date();
	if (date instanceof Date) curDate = date;
	else if (date) curDate = new Date(date);

	let fmt = rule || 'yyyy-MM-dd HH:mm:ss';
	fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString());
	type OType = {
		[key: string]: number;
	};
	const O: OType = {
		'M+': curDate.getMonth() + 1,
		'd+': curDate.getDate(),
		'H+': curDate.getHours(),
		'm+': curDate.getMinutes(),
		's+': curDate.getSeconds()
	};
	for (const k in O) {
		// const val = O[k].toString();
		fmt = fmt.replace(new RegExp(`(${k})`), O[k] > 9 ? O[k].toString() : '0' + O[k].toString());
		// fmt = fmt.replace(new RegExp(`(${k})`), ('00' + val).substring(val.length))
	}
	return fmt;
};

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
	return list.reduce((result: string[], item: Menu.MenuItem) => {
		return result.concat(Array.isArray(item.children) && !item.buttons ? getMenuPath(item.children) : item.path + '');
	}, []);
};

// 递归查找树的路径
export const findTreeNode = (tree: Menu.MenuItem[], pathName: string, path: string[]): string[] => {
	if (!tree) return [];
	for (const data of tree) {
		path.push(data.menuName);
		if (data.path === pathName) return path;
		if (data.children?.length) {
			const list = findTreeNode(data.children, pathName, path);
			if (list?.length) return list;
		}
		path.pop();
	}
	return [];
};

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
	for (const item of routes) {
		if (item.path == path) {
			return item;
		}
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (res) return res;
		}
	}
	return '';
};
