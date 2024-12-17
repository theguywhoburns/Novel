import { useTheme } from '@/theme';
import { Button, ButtonProps } from '@mui/material';

interface IRoundedButton extends ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	variant?: 'contained' | 'outlined' | 'text';
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
}

export const RoundedButton = ({
	children,
	onClick,
	variant = 'contained',
	startIcon,
	endIcon,
	disabled,
	sx,
	...props
}: IRoundedButton) => {
	const theme = useTheme();

	return (
		<Button
			variant={variant}
			onClick={onClick}
			startIcon={startIcon}
			endIcon={endIcon}
			disabled={disabled}
			sx={{
				maxWidth: '400px',
				width: '100%',
				padding: '12px 30px',
				borderRadius: '50px',
				fontSize: '16px',
				fontWeight: 500,
				textTransform: 'none',
				trasition: '0.5s',

				background:
					variant === 'contained'
						? `linear-gradient(
					to right,
					${theme.rounded_button_linear_gradiend_1} -150%,
					${theme.rounded_button_linear_gradiend_2} 100%
				);`
						: 'transparent',
				color: variant === 'contained' ? `${theme.white} ` : theme.accent_color,

				border:
					variant === 'outlined' ? `1px solid ${theme.accent_color}` : 'none',

				'&:hover': {
					background:
						variant === 'contained'
							? `linear-gradient(
					to right,
					${theme.rounded_button_linear_gradiend_1} -150%,
					${theme.rounded_button_linear_gradiend_2} 100%
				);`
							: 'transparent',
					color: variant !== 'contained' ? theme.accent_color : theme.white,
				},

				'&.Mui-disabled': {
					background: theme.separator_color,
					backgroundColor: theme.separator_color,
					color: theme.white,
					cursor: 'not-allowed',
					pointerEvents: 'auto',
				},

				...sx,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};
