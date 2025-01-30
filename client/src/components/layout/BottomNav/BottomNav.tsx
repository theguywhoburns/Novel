import { Separator } from '@/components/ui/Separator/Separator';
import {
	IconChat,
	IconLike,
	IconMagnifyingGlass,
	IconMyProfile,
	IconPlaces,
	IconReels,
} from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { BottomNavigation } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BottomNavAction } from './BottomNavAction/BottomNavAction';

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
						style={{
							backgroundColor: theme.background_color,
						}}
					>
						<BottomNavAction
							label='Home'
							to={RouteNames.HOME}
							icon={
								<IconMagnifyingGlass focused={pathname === RouteNames.HOME} />
							}
						/>
						<BottomNavAction
							label='Reels'
							to={RouteNames.REELS}
							icon={<IconReels focused={pathname === RouteNames.REELS} />}
						/>
						<BottomNavAction
							label='Interests'
							to={RouteNames.PLACES}
							icon={<IconPlaces focused={pathname === RouteNames.PLACES} />}
						/>
						<BottomNavAction
							label='Messenger'
							to={RouteNames.MESSENGER}
							icon={<IconChat focused={pathname === RouteNames.MESSENGER} />}
						/>
						<BottomNavAction
							label='MyProfile'
							to={RouteNames.MY_PROFILE}
							icon={
								<IconMyProfile focused={pathname === RouteNames.MY_PROFILE} />
							}
						/>
						<BottomNavAction
							label='Testing playground'
							to={RouteNames.TESTING_PLAYGROUND}
							icon={<IconLike />}
							sx={{ color: theme.text_color }}
						/>
					</BottomNavigation>
				</>
			)}
		</>
	);
};
