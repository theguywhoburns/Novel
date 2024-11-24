import { useTheme } from '@/theme';
import styles from './Modal.module.css';

interface IModal {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

export const Modal = ({ isOpen, setIsOpen, children, ...props }: IModal) => {
	const theme = useTheme();

	return (
		<div
			className={styles.modal + ' ' + (isOpen ? styles.active : '')}
			onClick={() => setIsOpen(prev => !prev)}
		>
			<div
				className={styles.modalContent}
				style={{
					backgroundColor: theme.background_color,
					color: theme.text_color,
				}}
				onClick={e => e.stopPropagation()}
				{...props}
			>
				<div
					className={styles.closeIconWrapper}
					style={{ color: theme.text_color }}
					onClick={() => setIsOpen(false)}
				>
					&#x2715;
				</div>
				{children}
			</div>
		</div>
	);
};
