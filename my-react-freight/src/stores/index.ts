import { User } from '@/types/api';
import { create } from 'zustand';
// 用户信息
export const useUserInfo = create<{
	token: string;
	userInfo: User.UserInfo;
	setUserInfo: (info: User.UserInfo) => void;
	setToken: (token: string) => void;
	clearInfo: () => void;
}>(set => ({
	token: '',
	userInfo: {},
	setUserInfo: info => set({ userInfo: info }),
	setToken: token => set({ token }),
	clearInfo: () => set({}, true)
}));
