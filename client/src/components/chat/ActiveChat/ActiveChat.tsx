import { MessagesList } from '@/components/chat/MessagesList/MessagesList';
import styles from './ActiveChat.module.css';
import { ChatInput } from './ChatInput/ChatInput';

export const ActiveChat = () => {
	return (
		<div className={styles.activeChat}>
			<MessagesList />
			<ChatInput />
		</div>
	);
};
