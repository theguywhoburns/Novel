import { ActiveChat } from '@/components/ChatsList/Chat/ActiveChat/ActiveChat';
import styles from './ChatPage.module.css';

export const ChatPage = () => {
	return (
		<div className={styles.chatPage}>
			<ActiveChat />
		</div>
	);
};
