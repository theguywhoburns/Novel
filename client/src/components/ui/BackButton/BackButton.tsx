import { IconArrow } from '@/icons';
import { useTheme } from '@/theme';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IBackButton {
	backgroundColor?: string;
	arrowColor?: string;
	className?: string;
	onClick?: () => void;
}

export const BackButton = ({
	backgroundColor,
	arrowColor,
	className,
	onClick,
}: IBackButton) => {
	const theme = useTheme();

	const defaultBackgroundColor = theme.button_background_color;
	const defaultColor = theme.accent_color;

	const navigate = useNavigate();

	const handleClick = () => {
		navigate(-1);
		onClick && onClick();
	};

	return (
		<IconButton
			className={className}
			sx={{
				backgroundColor: backgroundColor || defaultBackgroundColor,
				marginRight: 'auto',
				width: 40,
				height: 40,
			}}
			onClick={handleClick}
		>
			<IconArrow color={arrowColor || defaultColor} />
		</IconButton>
	);
};
