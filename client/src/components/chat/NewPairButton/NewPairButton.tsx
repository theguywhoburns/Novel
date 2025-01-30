import { IconSemiTransparentHeart, ImageLikedUsers } from '@/icons';
import { RouteNames } from '@/routes';
import { useTheme } from '@/theme';
import { useNavigate } from 'react-router-dom';
import { Pair } from '../Pair/Pair';
import styles from './NewPairButton.module.css';

export const NewPairButton = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(RouteNames.LIKES);
	};

	return (
		<Pair
			onClick={handleClick}
			renderImage={() => (
				<div className={styles.imgContainer}>
					<ImageLikedUsers />
					<IconSemiTransparentHeart className={styles.overlayIcon} />
				</div>
			)}
			renderText={() => (
				<p className={styles.text} style={{ color: theme.accent_color }}>
					Посмотреть лайки
				</p>
			)}
			isButton={true}
		/>
	);
};
