import { IconEmptyChat } from '@/icons';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';
import { IMessage } from '../ChatsList/Chat/Chat';
import { Message } from './Message/Message';
import styles from './MessagesList.module.css';

/* const initialMessages: IMessage[] = [
	{
		id: 1,
		chatId: 1,
		senderId: 1,
		recipientId: 2,
		type: 'text',
		text: 'Привет, как дела?',
		createdAt: new Date('2023-02-20T14:30:00.000Z'),
		status: 'read',
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
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
		replyToMessageId: null,
	},
]; */

export const MessagesList = ({
	chatInputRef,
	onChatInputHeightAvailable,
}: {
	chatInputRef: React.RefObject<HTMLDivElement>;
	onChatInputHeightAvailable: (height: number) => void;
}) => {
	const theme = useTheme();

	const messages = useMessengerStore(state => state.messages);

	const [offsetLeft, setOffsetLeft] = useState(0);
	const [activeButtonsGroupId, setActiveButtonsGroupId] = useState<
		number | null
	>(null);

	useEffect(() => {
		// getMessages();
	});

	const replyTo = useMessengerStore(state => state.replyTo);
	const messageToEdit = useMessengerStore(state => state.messageToEdit);

	const memoizedMessages: IMessage[] = useMemo(() => messages, [messages]);

	const chatInputHeight = chatInputRef.current?.offsetHeight || 0;

	useLayoutEffect(() => {
		if (chatInputRef.current) {
			const height = chatInputRef.current.offsetHeight;
			onChatInputHeightAvailable(height);
		}
	}, [chatInputRef, replyTo, messageToEdit]);

	const toggleButtonsGroup = useCallback(
		(
			messageId: number,
			event: React.MouseEvent,
			isSender: boolean,
			messageRef: React.RefObject<HTMLLIElement>
		) => {
			setActiveButtonsGroupId(prevId =>
				prevId === messageId ? null : messageId
			);

			const buttonsGroupHalfWidth = 69;
			const windowWidth = window.innerWidth;
			const messageWidth = messageRef.current?.offsetWidth || 0;

			const calculatedLeft =
				Math.min(
					Math.max(event.nativeEvent.offsetX, 0),
					windowWidth - buttonsGroupHalfWidth
				) + (!isSender ? 45 : 0);

			setOffsetLeft(
				calculatedLeft < buttonsGroupHalfWidth
					? buttonsGroupHalfWidth
					: calculatedLeft > messageWidth - buttonsGroupHalfWidth
					? messageWidth - buttonsGroupHalfWidth
					: calculatedLeft
			);

			messageRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		},
		[]
	);

	return (
		<>
			{memoizedMessages?.length ? (
				<ul
					className={styles.messagesList}
					style={{ paddingBottom: chatInputHeight + 6 }}
				>
					{memoizedMessages.map((message, index) => {
						const nextMessage = memoizedMessages[index + 1];
						return (
							<MemoizedMessage
								key={message.id}
								{...message}
								nextMessageSenderId={nextMessage?.senderId || null}
								visibleButtonsGroupId={activeButtonsGroupId}
								onToggleButtonsGroup={toggleButtonsGroup}
								left={offsetLeft}
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
		</>
	);
};

const MemoizedMessage = memo(Message);
