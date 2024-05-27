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
