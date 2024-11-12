import { useTheme } from '@/theme';
import { styled, Switch, SwitchProps } from '@mui/material';

export const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => {
	const customTheme = useTheme();
	return {
		width: 42,
		height: 26,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '200ms',
			'&.Mui-checked': {
				transform: 'translateX(16px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: customTheme.button_selected_background_color,
					opacity: 1,
					border: 0,
					...theme.applyStyles('dark', {
						backgroundColor: customTheme.button_selected_background_color,
					}),
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: customTheme.button_background_color,
				border: '6px solid #fff',
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.grey[100],
				...theme.applyStyles('dark', {
					color: theme.palette.grey[600],
				}),
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.7,
				...theme.applyStyles('dark', {
					opacity: 0.3,
				}),
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 22,
			height: 22,
		},
		'& .MuiSwitch-track': {
			borderRadius: 26 / 2,
			backgroundColor: customTheme.button_background_color,
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500,
			}),
			...theme.applyStyles('dark', {
				backgroundColor: customTheme.button_background_color,
			}),
		},
	};
});
