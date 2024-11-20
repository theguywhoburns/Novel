import { ActiveChat } from '@/components';
import styles from './ChatPage.module.css';

export const ChatPage = () => {
	return (
		<div className={styles.chatPage}>
			<ActiveChat />
		</div>
	);
};
