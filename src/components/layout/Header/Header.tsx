import { useSettingsStore } from '@/store/settings/useSettingsStore';
import styles from './Header.module.css';
import { IconLogo, IconSettingsGear, IconShield } from '@/icons';
import { Link } from 'react-router-dom';

export const Header = () => {
	const setIsSettingsOpen = useSettingsStore(state => state.setIsSettingsOpen);

	return (
		<header className={styles.header}>
			<Link to='/'>
				<IconLogo style={{ width: 140, height: 50 }} />
			</Link>

			<div className={styles.buttonsWrapper}>
				<button className={styles.button}>
					<IconShield />
				</button>
				<button
					onClick={() => setIsSettingsOpen(true)}
					className={styles.button}
				>
					<IconSettingsGear />
				</button>
			</div>
		</header>
	);
};
