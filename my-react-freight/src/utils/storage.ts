export default {
	/**
	 * 新增本地存储的项
	 * @param key 存储的键
	 * @param value 存储的内容
	 */
	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	/**
	 * 获取本地存储的项
	 * @param key 需要查询的键
	 * @returns 返回内容
	 */
	get(key: string) {
		const content = localStorage.getItem(key);
		if (!content) {
			return content;
		}
		try {
			return JSON.parse(content);
		} catch (e) {
			return content;
		}
	},
	/**
	 * 删除本地存储的项
	 * @param key 需要删除的键
	 */
	remove(key: string) {
		localStorage.removeItem(key);
	},
	/**
	 * 清空本地存储
	 */
	clear() {
		localStorage.clear();
	}
};
