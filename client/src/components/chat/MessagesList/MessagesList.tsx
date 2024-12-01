import { Loader } from '@/components/ui/Loader/Loader';
import { IconEmptyChat } from '@/icons';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useTheme } from '@/theme';
import {
	memo,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
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
		replyToMessage: null,
	},
]; */

interface IMessagesList {
	chatInputRef: React.RefObject<HTMLDivElement>;
	onChatInputHeightAvailable: (height: number) => void;
	loadMoreMessages: () => void;
	hasMoreMessages: boolean;
	pageSize: number;
	lastMessageInPageIndex: number;
}

export const MessagesList = ({
	chatInputRef,
	onChatInputHeightAvailable,
	loadMoreMessages,
	hasMoreMessages,
	lastMessageInPageIndex,
}: IMessagesList) => {
	const theme = useTheme();

	const messages = useMessengerStore(state => state.messages);

	const [offsetLeft, setOffsetLeft] = useState(0);
	const [activeButtonsGroupId, setActiveButtonsGroupId] = useState<
		number | null
	>(null);

	const replyTo = useMessengerStore(state => state.replyTo);
	const messageToEdit = useMessengerStore(state => state.messageToEdit);

	const memoizedMessages: IMessage[] = useMemo(() => messages, [messages]);
	const isMessagesLoading = useMessengerStore(state => state.isMessagesLoading);

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
			messageRef: React.RefObject<HTMLDivElement>
		) => {
			setActiveButtonsGroupId(prevId =>
				prevId === messageId ? null : messageId
			);

			const buttonsGroupHalfWidth = 69;
			const messageWidth = messageRef.current?.offsetWidth || 0;
			const clickPosition = event.nativeEvent.offsetX;

			let left;

			// Click on the left half? Center the button group there
			if (clickPosition <= messageWidth / 2) {
				left = clickPosition - buttonsGroupHalfWidth / 2;
			} else if (clickPosition >= messageWidth - buttonsGroupHalfWidth) {
				// Click near the right edge? Align the button group to the right
				left = messageWidth - buttonsGroupHalfWidth * 2;
			} else {
				// Otherwise, center the button group relative to the click
				left = clickPosition - buttonsGroupHalfWidth;
			}

			// Ensure left stays within the message boundaries
			left = Math.max(Math.min(left, messageWidth - buttonsGroupHalfWidth), 0);

			setOffsetLeft(left);

			messageRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		},
		[]
	);

	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollRef.current?.addEventListener('scroll', handleScroll);

		return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = (e: any) => {
		const isTop = e.target.scrollTop === 0;

		if (isTop && hasMoreMessages) {
			console.log('top and has more messages');
			loadMoreMessages();
		}
	};

	const scrollToMessage = () => {
		const messagesNode = document.querySelector(
			`li[data-index="${lastMessageInPageIndex}"]`
		);

		if (messagesNode) {
			console.log('scroll to message with index', lastMessageInPageIndex);

			messagesNode.scrollIntoView({
				behavior: 'instant',
				block: 'start',
			});
		}
	};

	useEffect(() => {
		scrollToMessage();
	}, [memoizedMessages]);

	return (
		<div
			ref={scrollRef}
			style={{
				maxHeight: 'calc(100% - 62.33px)',
				height: '100%',
				overflowY: 'auto',
				scrollbarWidth: 'none',
			}}
		>
			{memoizedMessages.length && !isMessagesLoading ? (
				<ul
					className={styles.messagesList}
					style={{
						paddingBottom:
							6 + (replyTo || messageToEdit ? chatInputHeight - 64 : 0),
					}}
				>
					{memoizedMessages.map((message, index) => {
						const nextMessage = memoizedMessages[index + 1];

						return (
							<li key={message?.id} data-index={index}>
								<MemoizedMessage
									key={message?.id}
									{...message}
									nextMessageSenderId={nextMessage?.senderId || null}
									visibleButtonsGroupId={activeButtonsGroupId}
									onToggleButtonsGroup={toggleButtonsGroup}
									left={offsetLeft}
									data-id={message.id}
								/>
							</li>
						);
					})}
				</ul>
			) : !memoizedMessages.length && !isMessagesLoading ? (
				<div className={styles.noMessages} style={{ color: theme.grey }}>
					<div className={styles.iconWrapper}>
						<IconEmptyChat />
					</div>
					<p className={styles.noMessagesText}>Нет сообщений!</p>
					<p className={styles.noMessagesText}>Начни диалог первым</p>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

const MemoizedMessage = memo(Message);
