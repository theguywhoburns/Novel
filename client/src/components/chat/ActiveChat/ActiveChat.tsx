import { MessagesList } from '@/components/chat/MessagesList/MessagesList';
import { useChatWebSocket } from '@/hooks/sockets/useChatWebSocket';
import { useScrollRef } from '@/hooks/useScrollRef';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ActiveChat.module.css';
import { ChatInput } from './ChatInput/ChatInput';

export const ActiveChat = () => {
	const {
		loadMoreMessages,
		sendNewMessage,
		editMessage,
		updateMessageStatus,
		hasMoreMessages,
		pageSize,
		lastMessageInPageIndex,
	} = useChatWebSocket();

	const chatInputRef = useRef<HTMLDivElement | null>(null);

	const isNewMessageSent = useMessengerStore(state => state.isNewMessageSent);

	const scrollRef = useScrollRef({
		behavior: 'instant',
		deps: [isNewMessageSent],
	});

	useEffect(() => console.log('IS NEW MESSAGE SENT: ', isNewMessageSent), [
		isNewMessageSent,
	]);

	const [_, setChatInputHeight] = useState(0);

	const onChatInputHeightAvailable = useCallback((height: number) => {
		setChatInputHeight(height);
	}, []);

	return (
		<div className={styles.activeChat}>
			<MessagesList
				chatInputRef={chatInputRef}
				scrollBottomRef={scrollRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
				loadMoreMessages={loadMoreMessages}
				updateMessageStatus={updateMessageStatus}
				hasMoreMessages={hasMoreMessages}
				pageSize={pageSize}
				lastMessageInPageIndex={lastMessageInPageIndex}
			/>

			<ChatInput
				ref={chatInputRef}
				scrollBottomRef={scrollRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
				editMessage={editMessage}
				sendNewMessage={sendNewMessage}
			/>
		</div>
	);
};
