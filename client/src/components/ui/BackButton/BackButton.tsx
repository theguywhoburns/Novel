import { IconArrow } from '@/icons';
import { useTheme } from '@/theme';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.css';

interface IBackButton {
	backgroundColor?: string;
	arrowColor?: string;
	className?: string;
}

export const BackButton = ({
	backgroundColor,
	arrowColor,
	className,
}: IBackButton) => {
	const theme = useTheme();

	const defaultBackgroundColor = theme.button_background_color;
	const defaultColor = theme.accent_color;

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(-1);
	};

	return (
		<IconButton
			className={`${styles.backButton} ${className || ''}`}
			style={{
				backgroundColor: backgroundColor || defaultBackgroundColor,
			}}
			onClick={handleClick}
		>
			<IconArrow color={arrowColor || defaultColor} />
		</IconButton>
	);
};
