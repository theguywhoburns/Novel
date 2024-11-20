import { IconCross, IconDiscard, IconLike } from '@/icons';
import { IconCrystal } from '@/icons/Crystal';
import { useTheme } from '@/theme';
import styles from './Home.module.css';

const Home = () => {
	const theme = useTheme();

	return (
		<div
			className={styles.screen}
			style={{ backgroundColor: theme.background_color }}
		>
			<div className={styles.lilMenu}>
				<button className={styles.lilMenuBtn}>
					<IconDiscard />
				</button>
				<button className={styles.lilMenuBtn}>
					<IconCross />
				</button>
				<button className={styles.lilMenuBtn}>
					<IconLike />
				</button>
				<button className={styles.lilMenuBtn}>
					<IconCrystal />
				</button>
			</div>
		</div>
	);
};

export default Home;
