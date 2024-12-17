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
import { Status } from '../ChatsList/Chat/Chat';
import { Message } from './Message/Message';
import styles from './MessagesList.module.css';

interface IMessagesList {
	chatInputRef: React.RefObject<HTMLDivElement>;
	scrollBottomRef: React.RefObject<HTMLDivElement>;
	onChatInputHeightAvailable: (height: number) => void;
	loadMoreMessages: () => void;
	updateMessageStatus: (messageId: number, status: Status) => void;
	hasMoreMessages: boolean;
	pageSize: number;
	lastMessageInPageIndex: number;
}

export const MessagesList = ({
	chatInputRef,
	scrollBottomRef,
	onChatInputHeightAvailable,
	loadMoreMessages,
	updateMessageStatus,
	hasMoreMessages,
	lastMessageInPageIndex,
}: IMessagesList) => {
	const theme = useTheme();

	const [offsetLeft, setOffsetLeft] = useState(0);
	const [activeButtonsGroupId, setActiveButtonsGroupId] = useState<
		number | null
	>(null);

	const replyTo = useMessengerStore(state => state.replyTo);
	const messageToEdit = useMessengerStore(state => state.messageToEdit);

	const isMessagesLoading = useMessengerStore(state => state.isMessagesLoading);
	const setIsMessagesLoading = useMessengerStore(
		state => state.setIsMessagesLoading
	);

	const messages = useMessengerStore(state => state.messages);
	const memoizedMessages = useMemo(() => messages, [messages]);

	const chatInputHeight = chatInputRef.current?.offsetHeight || 0;

	useEffect(() => {
		setIsMessagesLoading(true);
	}, []);

	useEffect(() => {
		if (messages) {
			updateMessageStatus(messages.slice(-1)[0]?.id, 'sent');
		}
	}, [messages.length]);

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

			if (messageWidth < buttonsGroupHalfWidth * 2) {
				left = messageWidth - buttonsGroupHalfWidth * 2;
			} // Click on the left half? Center the button group there
			else if (clickPosition <= messageWidth / 2) {
				left = clickPosition - buttonsGroupHalfWidth / 2;
			} else if (clickPosition >= messageWidth - buttonsGroupHalfWidth) {
				// Click near the right edge? Align the button group to the right
				left = messageWidth - buttonsGroupHalfWidth * 2;
			} else {
				// Otherwise, center the button group relative to the click
				left = clickPosition - buttonsGroupHalfWidth;
			}

			// Ensure left stays within the message boundaries
			left = Math.max(Math.min(left, messageWidth - buttonsGroupHalfWidth));

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
		console.log('scrollRef.current', scrollRef.current);
		scrollRef.current?.addEventListener('scroll', handleScroll);

		return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = (e: any) => {
		const isTop = e.target.scrollTop === 0;

		console.log('scroll', e.target.scrollTop);

		if (isTop && hasMoreMessages) {
			console.log('TOP');

			loadMoreMessages();
		}
		if (!isTop) {
			console.log('NOT TOP');
		}
		if (!hasMoreMessages) {
			console.log('NO MORE MESSAGES');
		}
	};

	const scrollToMessage = () => {
		const messageNode = document.querySelector(
			`li[data-index="${lastMessageInPageIndex}"]`
		);

		if (messageNode) {
			messageNode.scrollIntoView({
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
				maxHeight: '100%',
				height: '100%',
				overflowY: 'auto',
				scrollbarWidth: 'none',
			}}
		>
			{memoizedMessages.length && !isMessagesLoading ? (
				<ul
					className={styles.messagesList}
					style={{
						paddingBottom: replyTo || messageToEdit ? chatInputHeight - 60 : 0,
					}}
				>
					{memoizedMessages.map((message, index) => {
						const nextMessage = memoizedMessages[index + 1];

						return (
							<li key={message.id} data-index={index}>
								<MemoizedMessage
									key={message.id}
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
			<div ref={scrollBottomRef} />
		</div>
	);
};

const MemoizedMessage = memo(Message);
