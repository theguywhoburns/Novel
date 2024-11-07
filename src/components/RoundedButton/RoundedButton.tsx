import { Button } from '@mui/material';
import styles from './RoundedButton.module.css';

interface IRoundedButton {
	children: React.ReactNode;
	onClick: () => void;
}

export const RoundedButton = ({ children, onClick }: IRoundedButton) => {
	return (
		<Button
			className={styles.button}
			variant='contained'
			onClick={onClick}
			sx={{
				maxWidth: '400px',
				width: '100%',
				padding: '12px 30px',
				borderRadius: '50px',
				fontSize: '16px',
			}}
		>
			{children}
		</Button>
	);
};
