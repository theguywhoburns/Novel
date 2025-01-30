import {
	IconEdit,
	IconHeaderGeoTag,
	IconHeaderVerified,
	IconLogo,
	IconSettingsGear,
	IconShield,
} from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
	const theme = useTheme();
	const { pathname } = useLocation();

	const isMessengerPage = pathname === RouteNames.MESSENGER;
	const isHomePage = pathname === RouteNames.HOME;
	const isPlacesPage = pathname === RouteNames.PLACES;
	const isMyProfilePage = pathname === RouteNames.MY_PROFILE;

	return (
		<header
			className={styles.header}
			style={{ backgroundColor: theme.background_color }}
		>
			<Link to='/'>
				<IconLogo style={{ width: 140, height: 50 }} />
			</Link>

			<div className={styles.linksWrapper}>
				{(isHomePage || isMessengerPage) && (
					<Link
						to='/'
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconShield />
					</Link>
				)}

				{isHomePage && (
					<Link
						to='/settings'
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconSettingsGear />
					</Link>
				)}

				{isPlacesPage && (
					<Link
						to='/'
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconHeaderGeoTag />
					</Link>
				)}

				{isMyProfilePage && (
					<>
						<Link
							to='/'
							className={styles.link}
							style={{ backgroundColor: theme.button_background_color }}
						>
							<IconEdit />
						</Link>

						<Link
							to='/'
							className={styles.link}
							style={{ backgroundColor: theme.button_background_color }}
						>
							<IconHeaderVerified />
						</Link>
					</>
				)}
			</div>
		</header>
	);
};
