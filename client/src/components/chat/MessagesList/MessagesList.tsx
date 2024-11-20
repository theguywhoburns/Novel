import { useScrollRef } from '@/hooks/useScrollRef';
import { IconEmptyChat } from '@/icons';
import { useTheme } from '@/theme';
import { IMessage } from '../ChatsList/Chat/Chat';
import { Message } from './Message/Message';
import styles from './MessagesList.module.css';

const messages: IMessage[] = [
	{
		id: 1,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text: 'Привет, как дела?',
		createdAt: new Date('2023-02-20T14:30:00.000Z'),
		status: 'read',
	},
	{
		id: 2,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text: 'Я хорошо, спасибо!',
		createdAt: new Date('2023-02-20T14:35:00.000Z'),
		status: 'read',
	},
	{
		id: 3,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text: 'Отлично!',
		createdAt: new Date('2023-02-20T14:40:00.000Z'),
		status: 'read',
	},
	{
		id: 4,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text:
			'Я вчера был на концерте, и это было просто невероятно! Я видел своего любимого исполнителя и даже получил автограф!',
		createdAt: new Date('2023-02-20T14:45:00.000Z'),
		status: 'read',
	},
	{
		id: 5,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text:
			'Это звучит невероятно! Я тоже люблю этот исполнитель. Какой был твой любимый момент на концерте?',
		createdAt: new Date('2023-02-20T14:50:00.000Z'),
		status: 'read',
	},
	{
		id: 6,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text:
			'Мой любимый момент был когда исполнитель исполнил свою новую песню. Она была просто потрясающей!',
		createdAt: new Date('2023-02-20T14:55:00.000Z'),
		status: 'read',
	},
	{
		id: 7,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text: 'Я обязательно посмотрю видео этого концерта. Спасибо за рассказ!',
		createdAt: new Date('2023-02-20T15:00:00.000Z'),
		status: 'read',
	},
	{
		id: 8,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text: 'Спасибо за поддержку!',
		createdAt: new Date('2023-02-20T15:05:00.000Z'),
		status: 'read',
	},
	{
		id: 9,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text: 'Спасибо за поддержку!',
		createdAt: new Date('2023-02-20T15:05:00.000Z'),
		status: 'read',
	},
	{
		id: 10,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text: 'Спасибо за поддержку!',
		createdAt: new Date('2023-02-20T15:05:00.000Z'),
		status: 'read',
	},
	{
		id: 11,
		chatId: 1,
		senderId: 2,
		recipientId: 1,
		type: 'text',
		text:
			'Мой любимый момент был когда исполнитель исполнил свою новую песню. Она была просто потрясающей!',
		createdAt: new Date('2023-02-20T14:55:00.000Z'),
		status: 'read',
	},
	{
		id: 12,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text: 'Я обязательно посмотрю видео этого концерта. Спасибо за рассказ!',
		createdAt: new Date('2023-02-20T15:00:00.000Z'),
		status: 'read',
	},
];

export const MessagesList = () => {
	const theme = useTheme();

	const scrollRef = useScrollRef({ behavior: 'smooth', delay: 1 });

	return (
		<>
			{messages?.length ? (
				<ul className={styles.messagesList}>
					{messages?.map((message, index) => {
						const nextMessage = messages[index + 1];

						return (
							<Message
								key={message.id}
								{...message}
								nextMessageSenderId={
									nextMessage?.senderId ? nextMessage.senderId : null
								}
							/>
						);
					})}
				</ul>
			) : (
				<div className={styles.noMessages} style={{ color: theme.grey }}>
					<div className={styles.iconWrapper}>
						<IconEmptyChat />
					</div>
					<p className={styles.noMessagesText}>Нет сообщений!</p>
					<p className={styles.noMessagesText}>Начни диалог первым</p>
				</div>
			)}

			<div ref={scrollRef} />
		</>
	);
};
