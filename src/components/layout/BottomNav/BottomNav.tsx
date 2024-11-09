import { IconChat, IconLike, IconMagnifyingGlass, IconPlaces, IconReels } from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav = () => {
	const theme = useTheme();
	const location = useLocation();
	return (
		<BottomNavigation
			style={{
				position: 'fixed',
				bottom: 0,
				backgroundColor: theme.background_color,
				justifyContent: 'space-between',
				left: 0,
				right: 0,
				height: 60,
			}}
		>
			<BottomNavigationAction
				label='Home'
				component={Link}
				to={RouteNames.HOME}
				icon={<IconMagnifyingGlass focused={location.pathname === RouteNames.HOME} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Reels'
				component={Link}
				to={RouteNames.REELS}
				icon={<IconReels focused={location.pathname === RouteNames.REELS} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Interests'
				component={Link}
				to={RouteNames.Interests}
				icon={<IconPlaces focused={location.pathname === RouteNames.Interests} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Chat'
				component={Link}
				to={RouteNames.CHAT}
				icon={<IconChat focused={location.pathname === RouteNames.CHAT} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Testing playground'
				component={Link}
				to={RouteNames.TESTING_PLAYGROUND}
				icon={<IconLike />}
				sx={{ color: theme.text_color }}
			/>
		</BottomNavigation>
	);
};

