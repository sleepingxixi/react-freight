export interface Result<T = any> {
	code: number;
	msg: string;
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
}

export namespace Report {
	export interface ReportData {
		driverCount?: number;
		totalMoney?: number;
		orderCount?: number;
		cityNum?: number;
	}
}
