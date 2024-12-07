import { Loader } from '@/components/ui/Loader/Loader';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useEffect, useState } from 'react';
import { Chat } from './Chat/Chat';
import styles from './ChatsList.module.css';

/* const chats: IChat[] = [
	{
		id: 1,
		userOneId: 1,
		userTwoId: 2,
		lastMessage: {
			id: 1,
			chatId: 1,
			senderId: 1,
			recipientId: 2,
			type: 'text',
			text: 'Hello!',
			createdAt: new Date('2023-02-20T14:30:00.000Z'),
			status: 'read',
			replyToMessage: null,
		},
		newMessagesAmount: 0,
		isMuted: true,
		user: {
			id: 6,
			name: 'John',
			imgSrc: 'https://via.placeholder.com/100',
			age: 25,
		},
	},
	{
		id: 2,
		userOneId: 1,
		userTwoId: 3,
		lastMessage: {
			id: 2,
			chatId: 2,
			senderId: 3,
			recipientId: 1,
			type: 'text',
			text: 'How are you?',
			createdAt: new Date('2023-02-20T14:35:00.000Z'),
			status: 'sent',
			replyToMessage: null,
		},
		newMessagesAmount: 1,
		isMuted: false,
		user: {
			id: 3,
			name: 'Jane',
			imgSrc: 'https://via.placeholder.com/100',
			age: 30,
		},
	},
	{
		id: 3,
		userOneId: 2,
		userTwoId: 3,
		lastMessage: {
			id: 3,
			chatId: 1,
			senderId: 2,
			recipientId: 1,
			type: 'image',
			text: 'I am good, thanks!',
			createdAt: new Date('2023-02-20T14:40:00.000Z'),
			status: 'read',
			replyToMessage: null,
		},
		newMessagesAmount: 0,
		isMuted: true,
		user: {
			id: 2,
			name: 'John',
			imgSrc: 'https://via.placeholder.com/100',
			age: 25,
		},
	},
	{
		id: 4,
		userOneId: 1,
		userTwoId: 4,
		lastMessage: {
			id: 4,
			chatId: 3,
			senderId: 1,
			recipientId: 4,
			type: 'text',
			text: 'What is up?',
			createdAt: new Date('2023-02-20T14:45:00.000Z'),
			status: 'sending',
			replyToMessage: null,
		},
		newMessagesAmount: 2,
		isMuted: true,
		user: {
			id: 5,
			name: 'John',
			age: 25,
			imgSrc: 'https://example.com/avatar.jpg',
		},
	},
]; */

export const ChatsList = () => {
	const chats = useMessengerStore(state => state.chats);
	const getChatsByUser = useMessengerStore(state => state.getChatsByUser);

	const [isLoading, setIsLoading] = useState(true);

	const userId = 1;

	useEffect(() => {
		getChatsByUser(userId);
		setIsLoading(false);
	}, []);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<ul className={styles.chatsList}>
					{chats?.map(chat => (
						<Chat key={chat.id} {...chat} />
					))}
				</ul>
			)}
		</>
	);
};
