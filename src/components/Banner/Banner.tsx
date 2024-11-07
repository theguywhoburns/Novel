import styles from './Banner.module.css';

interface IBanner {
	type: 'basic' | 'advanced';
	title: string;
	subTitle: string;
}

export const Banner = ({ type, title, subTitle }: IBanner) => {
	return (
		<div className={`${styles.banner} ${styles[type]}`}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.subTitle}>{subTitle}</p>
		</div>
	);
};
