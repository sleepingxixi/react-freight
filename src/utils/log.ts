/**
 * 这个文件是用来封装console打印的
 * 原因是最近看到了网上有几篇文章分享了比较有意思的日志，我也顺便学习并使用到我的demo项目中
 */

/**
 * 常见的console的用法
 * console.log();
 *  %s - 字符串
 *  %d or %i - 整数
 *  %f - 浮点数
 *  %o - 对象
 *  %c - css样式
 * console.info();
 * console.warn();
 * console.error()
 * console.table()
 */
// function demo() {
// 	const name = 'a';
// 	const age = 18;
// 	console.log('Name: %s,Age:%d', name, age); //Name: a,Age:18
// 	// 设置样式
// 	console.log('%c set css', 'color: pink; font-size: 20px ');
// }
// demo();

const prettyLog = () => {
	//判断是否生产环境,生产环境则不打印日志
	const isProduction = import.meta.env.MODE === 'production';
	const isEmpty = (value: any) => {
		return value == null || value === undefined || value === '';
	};
	const prettyPrint = (title: string, text: string, color: string) => {
		if (isProduction) return;
		console.log(
			`%c ${title} %c ${text} %c`,
			`background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
			`border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
			'background:transparent'
		);
	};
	// 基础信息打印
	const info = (textOrTitle: string, content = '') => {
		const title = isEmpty(content) ? 'Info' : textOrTitle;
		const text = isEmpty(content) ? textOrTitle : content;
		prettyPrint(title, text, '#909399');
	};
	const error = (textOrTitle: string, content = '') => {
		const title = isEmpty(content) ? 'Error' : textOrTitle;
		const text = isEmpty(content) ? textOrTitle : content;
		prettyPrint(title, text, '#F56C6C');
	};
	const warning = (textOrTitle: string, content = '') => {
		const title = isEmpty(content) ? 'Warning' : textOrTitle;
		const text = isEmpty(content) ? textOrTitle : content;
		prettyPrint(title, text, '#E6A23C');
	};
	const success = (textOrTitle: string, content = '') => {
		const title = isEmpty(content) ? 'Success ' : textOrTitle;
		const text = isEmpty(content) ? textOrTitle : content;
		prettyPrint(title, text, '#67C23A');
	};
	const picture = (url: string, scale = 1) => {
		if (isProduction) return;
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => {
			const c = document.createElement('canvas');
			const ctx = c.getContext('2d');
			if (ctx) {
				c.width = img.width;
				c.height = img.height;
				ctx.fillStyle = 'pink';
				ctx.fillRect(0, 0, c.width, c.height);
				ctx.drawImage(img, 0, 0);
				const dataUri = c.toDataURL('image/png');

				console.log(
					`%c sup?`,
					`font-size: 1px;
				        padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
				        background-image: url(${dataUri});
				        background-repeat: no-repeat;
				        background-size: ${img.width * scale}px ${img.height * scale}px;
				        color: transparent;
				        `
				);
			}
		};
		img.src = url;
	};
	return {
		info,
		error,
		warning,
		success,
		picture
	};
};

// 创建打印对象
const log = prettyLog();

export { log, prettyLog };
// log.picture(
// 	'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2024%2F0514%2Fd0ea93ebj00sdgx56001xd200u000gtg00hz00a2.jpg&thumbnail=660x2147483647&quality=80&type=jpg'
// );
