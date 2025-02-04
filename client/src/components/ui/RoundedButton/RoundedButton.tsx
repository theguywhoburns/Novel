import { useThemeStore } from '@/store/theme/useThemeStore';
import { useTheme } from '@/theme';
import { Button, ButtonProps } from '@mui/material';

interface IRoundedButton extends ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	variant?: 'contained' | 'outlined' | 'text';
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
	const themeVariant = useThemeStore(state => state.theme);

	const shadow =
		themeVariant === 'light'
			? '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.054), 0px 1px 5px 0px rgba(0,0,0,0.12)'
			: '0px 3px 1px -2px rgba(255,255,255,0.1), 0px 2px 2px 0px rgba(255,255,255,0.1), 0px 1px 5px 0px rgba(255,255,255,0.1)';

	const hoverShadow =
		themeVariant === 'light'
			? '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
			: '0px 2px 4px -1px rgba(255,255,255,0.05),0px 4px 5px 0px rgba(255,255,255,0.05),0px 1px 10px 0px rgba(255,255,255,0.05)';

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
				boxShadow: shadow,

				'&:hover': {
					background:
						variant === 'contained'
							? `linear-gradient(
					to right,
					${theme.rounded_button_linear_gradiend_1} -150%,
					${theme.rounded_button_linear_gradiend_2} 100%
				)`
							: 'transparent',
					color: variant !== 'contained' ? theme.accent_color : theme.white,
				},

				'&.MuiButton-root:hover': {
					boxShadow: hoverShadow,
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
