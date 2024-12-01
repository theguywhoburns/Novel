import { BackButton } from '@/components/ui/BackButton/BackButton';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import styles from './ChatHeader.module.css';

export const ChatHeader = () => {
	const theme = useTheme();

	const chat = useMessengerStore(state => state.chat);
	const setMessages = useMessengerStore(state => state.setMessages);

	return (
		<header className={styles.header}>
			<BackButton onClick={() => setMessages([])} />
			<div className={styles.recipientInfo}>
				<div style={{ color: theme.high_contrast_text_color }}>
					<span>{chat.interlocutor?.name},</span>
					<span>{chat.interlocutor?.age}</span>
				</div>

				<span className={styles.online} style={{ color: theme.grey }}>
					{chat.interlocutor?.gender === 'female' ? 'Была ' : 'Был '} недавно
				</span>
			</div>
			<img
				className={styles.avatar}
				src={chat.interlocutor?.imgSrc}
				alt='avatar'
			/>
		</header>
	);
};
