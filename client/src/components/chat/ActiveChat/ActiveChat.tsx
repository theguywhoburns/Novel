import { MessagesList } from '@/components/chat/MessagesList/MessagesList';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { useCallback, useRef, useState } from 'react';
import styles from './ActiveChat.module.css';
import { ChatInput } from './ChatInput/ChatInput';

export const ActiveChat = () => {
	const {
		socket,
		loadMoreMessages,
		hasMoreMessages,
		pageSize,
		lastMessageInPageIndex,
	} = useChatWebSocket();

	const chatInputRef = useRef<HTMLDivElement | null>(null);
	const [_, setChatInputHeight] = useState(0);

	const onChatInputHeightAvailable = useCallback((height: number) => {
		setChatInputHeight(height);
	}, []);

	return (
		<div className={styles.activeChat}>
			<MessagesList
				chatInputRef={chatInputRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
				loadMoreMessages={loadMoreMessages}
				hasMoreMessages={hasMoreMessages}
				pageSize={pageSize}
				lastMessageInPageIndex={lastMessageInPageIndex}
			/>

			<ChatInput
				ref={chatInputRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
				socket={socket.current}
			/>
		</div>
	);
};
