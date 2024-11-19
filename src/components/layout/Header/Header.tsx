import { IconLogo, IconSettingsGear, IconShield } from '@/icons';
import { useTheme } from '@/theme';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
	const theme = useTheme();

	return (
		<header id={styles.header}>
			<Link to='/'>
				<IconLogo style={{ width: 140, height: 50 }} />
			</Link>

			<div className={styles.buttonsWrapper}>
				<Link
					to='/'
					className={styles.link}
					style={{ backgroundColor: theme.button_background_color }}
				>
					<IconShield />
				</Link>

				<Link
					to='/settings'
					className={styles.link}
					style={{ backgroundColor: theme.button_background_color }}
				>
					<IconSettingsGear />
				</Link>
			</div>
		</header>
	);
};
