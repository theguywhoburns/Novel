import { useTheme } from '@/theme';
import styles from './Banner.module.css';

interface IBanner {
	type: 'basic' | 'advanced';
	title: string;
	subTitle: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Banner = ({ type, title, subTitle, Icon }: IBanner) => {
	const theme = useTheme();

	return (
		<div className={styles.wrapper}>
			<div
				className={`${styles.banner} ${styles[type]}`}
				style={{ color: theme.white }}
			>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.subTitle}>{subTitle}</p>
			</div>
			<Icon className={styles.icon} />
		</div>
	);
};
