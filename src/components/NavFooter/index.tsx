import styles from './index.module.scss';
const NavFooter = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.desc}>
				<a href='https://www.baidu.com'>smilePing</a>
				<span className={styles.gutter}>|</span>
				<a href='https://www.baidu.com'>后台管理项目</a>
				<span className={styles.gutter}>|</span>
				<span>尝试一下</span>
			</div>
			<div>Copyright ©2024 smileping0-1的react项目 </div>
		</div>
	);
};
export default NavFooter;
