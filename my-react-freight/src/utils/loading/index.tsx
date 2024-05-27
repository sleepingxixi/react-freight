// import { createRoot } from 'react-dom/client';
// import Loading from './loading';
let count = 0;
//方式一：动态的添加loading节点，结合antd的loading组件进行封装
// const showLoading = () => {
// 	if (count === 0) {
// 		// 创建节点之后，把这个节点由react渲染
// 		const loading = document.createElement('div');
// 		loading.setAttribute('id', 'loading');
// 		document.body.appendChild(loading);
// 		createRoot(loading).render(<Loading />);
// 	}
// 	count++;
// };

// const hideLoading = () => {
// 	if (count <= 0) return;
// 	count--;
// 	if (count === 0) document.body.removeChild(document.getElementById('loading')!);
// };

// 方式二：通过在index.html文件固定一个组件，然后通过动态的设置这个组件display的显示和隐藏
const showLoading = () => {
	if (count === 0) {
		const loading = document.getElementById('loading');
		loading?.style.setProperty('display', 'flex');
	}
	count++;
};

const hideLoading = () => {
	if (count <= 0) return;
	count--;
	if (count === 0) {
		const loading = document.getElementById('loading');
		loading?.style.setProperty('display', 'none');
	}
};
export { showLoading, hideLoading };
