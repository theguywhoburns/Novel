import { Separator } from '@/components/ui/Separator/Separator';
import {
	IconAlcohol,
	IconChat,
	IconLike,
	IconMagnifyingGlass,
	IconPlaces,
	IconReels,
} from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

interface IBottomNav {
	show: boolean;
}
export const BottomNav = ({ show }: IBottomNav) => {
	const theme = useTheme();

	const { pathname } = useLocation();

	return (
		<>
			{show && (
				<>
					<Separator marginY={[0, 0]} />
					<BottomNavigation
						className={styles.bottomNav}
						style={{
							backgroundColor: theme.background_color,
							justifyContent: 'space-between',
						}}
					>
						<BottomNavigationAction
							label='Home'
							component={Link}
							to={RouteNames.HOME}
							icon={
								<IconMagnifyingGlass focused={pathname === RouteNames.HOME} />
							}
							sx={{ color: theme.text_color }}
						/>
						<BottomNavigationAction
							label='Reels'
							component={Link}
							to={RouteNames.REELS}
							icon={<IconReels focused={pathname === RouteNames.REELS} />}
							sx={{ color: theme.text_color }}
						/>
						<BottomNavigationAction
							label='Interests'
							component={Link}
							to={RouteNames.PLACES}
							icon={<IconPlaces focused={pathname === RouteNames.PLACES} />}
							sx={{ color: theme.text_color }}
						/>
						<BottomNavigationAction
							label='Chat'
							component={Link}
							to={RouteNames.MESSENGER}
							icon={<IconChat focused={pathname === RouteNames.MESSENGER} />}
							sx={{ color: theme.text_color }}
						/>
						<BottomNavigationAction
							label='Testing playground'
							component={Link}
							to={RouteNames.TESTING_PLAYGROUND}
							icon={<IconLike />}
							sx={{ color: theme.text_color }}
						/>
						<BottomNavigationAction
							label='Profile'
							component={Link}
							to={RouteNames.PROFILE}
							icon={<IconAlcohol />}
							sx={{ color: theme.text_color }}
						/>
					</BottomNavigation>
				</>
			)}
		</>
	);
};
