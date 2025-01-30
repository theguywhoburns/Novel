import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import {
	BottomNavigationAction,
	BottomNavigationActionProps,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface IBottomNavAction extends BottomNavigationActionProps {
	to: RouteNames;
}

export const BottomNavAction = ({
	label,
	icon,
	to,
	...props
}: IBottomNavAction) => {
	const theme = useTheme();

	return (
		<BottomNavigationAction
			label={label}
			component={Link}
			to={to}
			icon={icon}
			sx={{
				color: theme.text_color,
				minWidth: '64px',
			}}
			{...props}
		/>
	);
};
