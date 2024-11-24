import { MessagesList } from '@/components/chat/MessagesList/MessagesList';
import { useChatWebSocket } from '@/hooks/useChatWebSocket';
import { useScrollRef } from '@/hooks/useScrollRef';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useCallback, useRef, useState } from 'react';
import styles from './ActiveChat.module.css';
import { ChatInput } from './ChatInput/ChatInput';

export const ActiveChat = () => {
	const { socket } = useChatWebSocket();

	const messages = useMessengerStore(state => state.messages);
	const scrollRef = useScrollRef({ behavior: 'smooth', deps: [messages] });

	const chatInputRef = useRef<HTMLDivElement>(null);
	const [_, setChatInputHeight] = useState(0);

	const onChatInputHeightAvailable = useCallback((height: number) => {
		setChatInputHeight(height);
	}, []);

	return (
		<div className={styles.activeChat}>
			<MessagesList
				chatInputRef={chatInputRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
			/>
			<div ref={scrollRef} />

			<ChatInput
				ref={chatInputRef}
				onChatInputHeightAvailable={onChatInputHeightAvailable}
				socket={socket.current}
			/>
		</div>
	);
};
