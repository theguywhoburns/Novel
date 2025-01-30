import { useUserActions } from '@/hooks/useUserActions';
import { IconCross, IconDiscard, IconLike } from '@/icons';
import { IconCrystal } from '@/icons/Crystal';
import { useTheme } from '@/theme';
import { IconButton } from '@mui/material';
import styles from './UserActionButtons.module.css';

interface IUserActionButtons extends React.ComponentProps<'div'> {
	navigateTo?: string;
}

export const UserActionButtons = ({
	navigateTo,
	...props
}: IUserActionButtons) => {
	const theme = useTheme();

	const { handleLike, handleDislike } = useUserActions({ navigateTo });

	const { className, ...otherProps } = props;

	return (
		<div className={[styles.actions, className].join(' ')} {...otherProps}>
			<IconButton
				sx={{
					width: 38,
					height: 38,
					padding: 0,
					backgroundColor: theme.background_color,
					transition: '0.2s',
				}}
			>
				<IconDiscard />
			</IconButton>

			<IconButton
				onClick={handleDislike}
				sx={{
					width: 54,
					height: 54,
					padding: 0,
					backgroundColor: theme.background_color,
					transition: '0.2s',
				}}
			>
				<IconCross />
			</IconButton>

			<IconButton
				onClick={handleLike}
				sx={{
					width: 54,
					height: 54,
					padding: 0,
					backgroundColor: 'transparent',
					transition: '0.2s',

					'&:hover': {
						opacity: 0.8,
					},
				}}
			>
				<IconLike />
			</IconButton>

			<IconButton
				sx={{
					width: 38,
					height: 38,
					padding: 0,
					backgroundColor: theme.background_color,
					transition: '0.2s',
				}}
			>
				<IconCrystal />
			</IconButton>
		</div>
	);
};
