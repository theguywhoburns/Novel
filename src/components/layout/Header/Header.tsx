import IconSettingsGear from '@/icons/settingsGear';
import IconShield from '@/icons/shield';
import { useSettingsStore } from '@/store/settings/useSettingsStore';
import styles from './header.module.css';

export const Header = () => {
	const setIsSettingsOpen = useSettingsStore(state => state.setIsSettingsOpen);

	return (
		<header className={styles.header}>
			<h1 className={styles.headerTitle}>novel</h1>

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
