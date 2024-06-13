import { IAuthLoader } from '@/router/AuthLoader';
import { useRouteLoaderData } from 'react-router-dom';
import { useUserInfo } from '@/stores';
import { Button } from 'antd';

export default function AuthButton(props: any) {
	const data = useRouteLoaderData('layout') as IAuthLoader;
	const role = useUserInfo(state => state.userInfo.role);
	if (!props.auth) return <Button {...props}>{props.children}</Button>;
	if (data.buttonList.includes(props.auth) || role === 1) {
		return <Button {...props}>{props.children}</Button>;
	}
	return <></>;
}
