import { UsersList } from '@/components/user/UsersList/UsersList';
import { IconCross, IconDiscard, IconLike } from '@/icons';
import { IconCrystal } from '@/icons/Crystal';
import { useTheme } from '@/theme';
import IconButton from '@mui/material/IconButton';
import styles from './Home.module.css';

export const HomePage = () => {
	const theme = useTheme();

	return (
		<div
			className={styles.homePage}
			style={{ backgroundColor: theme.background_color }}
		>
			<div className={styles.container}>
				<UsersList />

				<div className={styles.actions}>
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
			</div>
		</div>
	);
};
