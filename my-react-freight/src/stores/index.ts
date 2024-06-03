import { User } from '@/types/api';
import storage from '@/utils/storage';
import { create } from 'zustand';
// 用户信息
export const useUserInfo = create<{
	token: string;
	userInfo: User.UserInfo;
	setUserInfo: (info: User.UserInfo) => void;
	setToken: (token: string) => void;
	clearInfo: () => void;
	// 主题相关
	isDark: boolean;
	updateTheme: (isDark: boolean) => void;
}>(set => ({
	token: '',
	userInfo: {},
	setUserInfo: info => set({ userInfo: info }),
	setToken: token => set({ token }),
	clearInfo: () => set({}, true),
	isDark: storage.get('isDark') || false,
	updateTheme: isDark => set({ isDark })
}));
