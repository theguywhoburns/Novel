import { useThemeStore } from '@/store/theme/useThemeStore';
import { useTheme } from '@/theme';
import { Button, ButtonProps } from '@mui/material';
import React from 'react';

interface IPowerUpButton extends ButtonProps {
	Icon: React.ReactElement;
	children: React.ReactNode;
	textColor?: string;
}

export const PowerUpButton = ({
	Icon,
	children,
	textColor,
	...props
}: IPowerUpButton) => {
	const theme = useTheme();
	const themeVariant = useThemeStore(state => state.theme);

	const boxShadow =
		themeVariant === 'light'
			? '0px 0px 8px rgba(96, 96, 96, 0.1)'
			: '0px 0px 8px rgba(128, 128, 128, 0.2)';

	return (
		<Button
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: '5px',
				width: '99px',
				background: theme.background_color,
				color: textColor ?? theme.text_color,
				padding: '17px 12px',
				borderRadius: '10px',
				fontSize: '12px',
				lineHeight: '14px',
				fontWeight: 400,
				transition: '0.3s',
				boxShadow,

				'.MuiButton-startIcon': {
					margin: 0,
				},

				'&:hover': {
					background: theme.background_color,
					color: textColor ?? theme.text_color,
					opacity: 0.7,
				},
			}}
			startIcon={Icon}
			{...props}
		>
			{children}
		</Button>
	);
};
