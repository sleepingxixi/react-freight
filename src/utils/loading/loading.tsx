// 暂时不需要了
import { Spin } from 'antd';
import './loading.less';

export default function Loading({ tip = 'loading' }: { tip?: string }) {
	return (
		<Spin tip={tip} size='large' className='request-loading'>
			<p></p>
		</Spin>
	);
}
