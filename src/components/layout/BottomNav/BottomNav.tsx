import IconChat from '@/icons/Chat';
import IconLike from '@/icons/Like';
import IconMagnifyingGlass from '@/icons/MagnifyingClass';
import IconPlaces from '@/icons/Places';
import IconReels from '@/icons/Reels';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const BottomNav = () => {
	const theme = useTheme();
	const [currentNavIdx, setCurrentNavIdx] = useState(0);

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
			onChange={(event, newValue) => {
				console.log(event);
				setCurrentNavIdx(newValue);
			}}
		>
			<BottomNavigationAction
				label='Home'
				component={Link}
				to={RouteNames.HOME}
				icon={<IconMagnifyingGlass focused={currentNavIdx === 0} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Reels'
				component={Link}
				to={RouteNames.REELS}
				icon={<IconReels focused={currentNavIdx === 1} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Places'
				component={Link}
				to={RouteNames.PLACES}
				icon={<IconPlaces focused={currentNavIdx === 2} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Chat'
				component={Link}
				to={RouteNames.CHAT}
				icon={<IconChat focused={currentNavIdx === 3} />}
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
