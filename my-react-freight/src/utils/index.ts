// 格式化金额
export const formatMoney = (num: number | string) => {
	const newNum = parseFloat(num.toString());
	return newNum.toLocaleString('zh-CN', { style: 'currency', currency: 'CNY' });
};

export const formatNum = (num: number | string) => {
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
