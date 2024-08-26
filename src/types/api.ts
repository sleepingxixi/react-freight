// import DepartmentList from '@/pages/system/dept';

type NoRequired<T> = {
  [property in keyof T]?: T[property];
};

export interface pageParams {
  pageNum?: number;
  pageSize?: number;
  total?: number;
}
export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface ResultData<T = any> {
  list: T[];
  page: {
    pageNum: number;
    pageSize: number;
    total: number | 0;
  };
}

export namespace Login {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

export namespace User {
  export interface UserInfo {
    userImg?: string;
    _id?: string;
    userId?: number;
    userName?: string;
    userEmail?: string;
    mobile?: string;
    deptId?: string;
    deptName?: string;
    job?: string;
    state?: number;
    role?: number;
    createId?: number;
    roleList?: string;
  }

  // 从两个接口中获取类型字段，并设置为非必填
  export type RequestUserListParams = NoRequired<
    Pick<pageParams, 'pageNum' | 'pageSize'> & Pick<UserList, 'userId' | 'userName' | 'state'>
  >;

  export interface UserList {
    userImg: string;
    createTime: string;
    userId: number;
    userName: string;
    userEmail: string;
    mobile: string;
    sex: number;
    deptId: string;
    deptName: string;
    job: string;
    state: number;
    role: number;
    createId: number;
    lastLoginTime: string;
    roleList: string;
  }

  export interface UserListData {
    page: pageParams;
    list: UserList[];
  }
}

export namespace Report {
  export interface ReportData {
    driverCount?: number;
    totalMoney?: number;
    orderCount?: number;
    cityNum?: number;
  }
  export interface LineData {
    label: string[];
    order: number[];
    money: number[];
  }
}

export namespace Dept {
  export interface DeptListData {
    _id?: string;
    deptName?: string;
    userName?: string;
    parentId?: string;
    createId?: number;
    updateTime?: string;
    createTime?: string;
    __v?: number;
    children?: DeptData[];
  }
  export interface DeptData {
    page: RequestDeptListParams;
    list: DeptListData[];
  }
  export interface RequestDeptListParams extends pageParams {
    deptName?: string;
  }
  export interface AllUserData {
    _id: string;
    userId: number;
    userName: string;
    userEmail: string;
  }
}

// 菜单管理
export namespace Menu {
  export interface Params {
    menuName: string;
    menuState: number;
  }
  export interface CreateParams {
    menuName: string;
    icon?: string; // 菜单图标
    menuType: number; // 菜单类型 1：菜单 2：按钮 3：页面
    menuState: number; // 菜单正常 停用
    menuCode?: string; // 按钮权限标识
    parentId?: string; // 父级菜单id
    path?: string; // 菜单路径
    component?: string; // 组件名称
  }

  export interface MenuItem extends CreateParams {
    _id: string;
    createTime: string;
    buttons?: MenuItem[];
    children?: MenuItem[];
  }
  // 菜单编辑
  export interface EditParams extends CreateParams {
    _id: string;
  }

  // 删除菜单
  export interface DelParams {
    _id: string;
  }
}

export namespace Equipment {

  export interface Wifi {
    id?: number,
    name: string;
    ssid: string;
    password: string;
    createTime?: string;
    updateTime?: string;
  }
  export interface wifiListData {
    code: pageParams;
    data: Wifi[];
  }

}
