import IconChat from '@/icons/chat';
import IconLike from '@/icons/like';
import IconMagnifyingGlass from '@/icons/magnifying_class';
import IconPlaces from '@/icons/places';
import IconReels from '@/icons/reels';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { BottomNavigation, BottomNavigationAction, Link } from '@mui/material';
import { useState } from 'react';

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
				href={RouteNames.HOME}
				icon={<IconMagnifyingGlass focused={currentNavIdx === 0} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Reels'
				component={Link}
				href={RouteNames.REELS}
				icon={<IconReels focused={currentNavIdx === 1} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Places'
				component={Link}
				href={RouteNames.PLACES}
				icon={<IconPlaces focused={currentNavIdx === 2} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Chat'
				component={Link}
				href={RouteNames.CHAT}
				icon={<IconChat focused={currentNavIdx === 3} />}
				sx={{ color: theme.text_color }}
			/>
			<BottomNavigationAction
				label='Testing playground'
				component={Link}
				href={RouteNames.TESTING_PLAYGROUND}
				icon={<IconLike />}
				sx={{ color: theme.text_color }}
			/>
		</BottomNavigation>
	);
};
