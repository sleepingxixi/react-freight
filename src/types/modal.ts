import { MutableRefObject } from 'react';
export type IAction = 'create' | 'edit' | 'delete';
import { Equipment, User } from '@/types/api';

/**
 * 定义弹框的接口类型，使用ref的方式，需要先继承
 */
export interface IModalProp<T = User.UserList> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>;
  update: () => void;
}

export interface IDetailProp {
  mRef: MutableRefObject<{ open: (orderId: string) => void } | undefined>;
}

export interface IWifiProp<T = Equipment.Wifi> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>;
  update: () => void;
}
