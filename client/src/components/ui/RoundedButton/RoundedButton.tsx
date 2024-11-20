import { useTheme } from '@/theme';
import { Button, ButtonProps } from '@mui/material';

interface IRoundedButton extends ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
}

export const RoundedButton = ({
	children,
	onClick,
	...props
}: IRoundedButton) => {
	const theme = useTheme();
	return (
		<Button
			variant='contained'
			onClick={onClick}
			sx={{
				maxWidth: '400px',
				width: '100%',
				padding: '12px 30px',
				borderRadius: '50px',
				fontSize: '16px',
				textTransform: 'none',
				color: `${theme.white} !important`,
				background: `linear-gradient(
					to right,
					${theme.rounded_button_linear_gradiend_1} -150%,
					${theme.rounded_button_linear_gradiend_2} 100%
				);`,
			}}
			{...props}
		>
			{children}
		</Button>
	);
};
