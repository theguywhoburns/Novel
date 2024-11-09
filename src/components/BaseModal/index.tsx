import { Modal } from '@mui/material';
import styles from './BaseModal.module.css';
import { useTheme } from '@/theme';
import { IconArrow } from '@/icons';

export interface IBaseModalProps extends React.PropsWithChildren {
    name?: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
};
export const BaseModal = ({ children, name, visible, setVisible }: IBaseModalProps) => {
    const theme = useTheme();
    return (
        <Modal open={visible}>
            <div>
                <div className={styles.modalHeader}>
                        <button
							onClick={() => setVisible(false)}
							className={styles.modalBtn}
						>
							<IconArrow color={theme.accent_color} />
						</button>
                    <h2 className={styles.modalHeaderText}>{name}</h2>
                </div>
                <div className={styles.modalContainer}>
                    {children}
                </div>
            </div>
        </Modal>
    )
}