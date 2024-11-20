import { Chat, IChatProps } from './Chat/Chat';
import styles from './ChatsList.module.css';

const chats: IChatProps[] = [
	{
		id: 1,
		lastMessage: {
			id: 1,
			chatId: 1,
			senderId: 1,
			recipientId: 2,
			type: 'text',
			text: 'Hello!',
			createdAt: new Date('2023-02-20T14:30:00.000Z'),
			status: 'read',
		},
		newMessagesAmount: 0,
		areNotifivationsEnabled: true,
	},
	{
		id: 2,
		lastMessage: {
			id: 2,
			chatId: 2,
			senderId: 3,
			recipientId: 1,
			type: 'text',
			text: 'How are you?',
			createdAt: new Date('2023-02-20T14:35:00.000Z'),
			status: 'sent',
		},
		newMessagesAmount: 1,
		areNotifivationsEnabled: false,
	},
	{
		id: 3,
		lastMessage: {
			id: 3,
			chatId: 1,
			senderId: 2,
			recipientId: 1,
			type: 'image',
			text: 'I am good, thanks!',
			createdAt: new Date('2023-02-20T14:40:00.000Z'),
			status: 'read',
		},
		newMessagesAmount: 0,
		areNotifivationsEnabled: true,
	},
	{
		id: 4,
		lastMessage: {
			id: 4,
			chatId: 3,
			senderId: 1,
			recipientId: 4,
			type: 'text',
			text: 'What is up?',
			createdAt: new Date('2023-02-20T14:45:00.000Z'),
			status: 'sending',
		},
		newMessagesAmount: 2,
		areNotifivationsEnabled: true,
	},
];

export const ChatsList = () => {
	return (
		<ul className={styles.chatsList}>
			{chats?.map(chat => (
				<Chat key={chat.id} {...chat} />
			))}
		</ul>
	);
};
