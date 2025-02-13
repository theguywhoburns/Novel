import { useUserId } from '@/hooks/useUserId';
import {
	IconEdit,
	IconHeaderGeoTag,
	IconLogo,
	IconSettingsGear,
	IconShield,
} from '@/icons';
import { RouteBase, RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
	const theme = useTheme();
	const { pathname } = useLocation();

	const userId = useUserId();

	const isMessengerPage = pathname === RouteNames.MESSENGER;
	const isHomePage = pathname === RouteNames.HOME;
	const isPlacesPage = pathname === RouteNames.PLACES;
	const isMyProfilePage = pathname === RouteNames.MY_PROFILE;

	return (
		<header
			className={styles.header}
			style={{ backgroundColor: theme.background_color }}
		>
			<Link to={RouteNames.HOME}>
				<IconLogo />
			</Link>

			<div className={styles.linksWrapper}>
				{(isHomePage || isMessengerPage || isMyProfilePage) && (
					<Link
						to={pathname}
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconShield />
					</Link>
				)}

				{isHomePage && (
					<Link
						to={RouteNames.SETTINGS}
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconSettingsGear />
					</Link>
				)}

				{isPlacesPage && (
					<Link
						to={pathname}
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconHeaderGeoTag />
					</Link>
				)}

				{isMyProfilePage && (
					<Link
						to={`${RouteBase.PROFILE}/${userId}`}
						className={styles.link}
						style={{ backgroundColor: theme.button_background_color }}
					>
						<IconEdit />
					</Link>
				)}
			</div>
		</header>
	);
};
