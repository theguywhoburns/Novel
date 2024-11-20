import { IconArrow } from '@/icons';
import { useTheme } from '@/theme';
import { Modal } from '@mui/material';
import { SetStateAction } from 'react';
import styles from './BaseModal.module.css';

export interface IBaseModalProps extends React.PropsWithChildren {
	name?: string;
	visible: boolean;
	setVisible: React.Dispatch<SetStateAction<boolean>>;
}
export const BaseModal = ({
	children,
	name,
	visible,
	setVisible,
}: IBaseModalProps) => {
	const theme = useTheme();

	return (
		<Modal open={visible}>
			<div>
				<div className={styles.modalHeader}>
					<button
						onClick={() => setVisible(!visible)}
						className={styles.modalBtn}
					>
						<IconArrow color={theme.accent_color} />
					</button>
					<h2 className={styles.modalHeaderText}>{name}</h2>
				</div>
				<div className={styles.modalContainer}>{children}</div>
			</div>
		</Modal>
	);
};
