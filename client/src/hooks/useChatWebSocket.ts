import { IMessage, Status } from '@/components/chat/ChatsList/Chat/Chat';
import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { getServerUrl } from '@/utils/serverUrl';
import { useEffect, useRef, useState } from 'react';

export const useChatWebSocket = () => {
	const socket = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMoreMessages, setHasMoreMessages] = useState(true);

	const chat = useMessengerStore(state => state.chat);
	const setMessages = useMessengerStore(state => state.setMessages);

	const setIsMessagesLoading = useMessengerStore(
		state => state.setIsMessagesLoading
	);

	const pageSize = 20;

	const [lastMessageInPageIndex, setLastMessageInPageIndex] = useState(
		pageSize - 1
	);

	useEffect(() => console.log(hasMoreMessages), [hasMoreMessages]);

	const wsPort = 4200;
	const wsUrl = `ws://${getServerUrl()}:${wsPort}/api/ws`;

	const connectToSocket = () => {
		try {
			socket.current = new WebSocket(wsUrl);

			socket.current.onopen = () => {
				console.log('Connected to WebSocket');
				setIsConnected(true);

				if (socket.current?.readyState === WebSocket.OPEN) {
					getMessages();
				}
			};

			socket.current.onmessage = event => {
				const message = JSON.parse(event.data);

				switch (message.type) {
					case 'getMessages':
						setHasMoreMessages(message.messages.length === pageSize);
						setLastMessageInPageIndex(message.messages.length - 1);

						setTimeout(() => {
							setMessages(prev => [...message.messages, ...prev]);
							setIsMessagesLoading(false);
						}, 300);
						break;

					case 'editMessage':
						setMessages(prev => {
							return prev.map(m => {
								if (m.id === message.message.id) {
									return message.message;
								}

								if (m.replyToMessage?.id === message.message.id) {
									return {
										...m,
										replyToMessage: {
											...m.replyToMessage,
											text: message.message.text,
										},
									};
								}

								return m;
							});
						});
						break;

					case 'updateMessageStatus':
						setMessages(prev => {
							return prev.map(m => {
								if (m.id === message.message.id) {
									return {
										...m,
										status: message.message.status,
									};
								}
								return m;
							});
						});
						break;

					default:
						setMessages(prev => [...prev, message]);
						break;
				}
			};

			socket.current.onclose = e => {
				console.log(':: Socket closed: ', e);
				setIsConnected(false);
			};

			socket.current.onerror = err => {
				console.error(':: Socket error: ', err);
			};
		} catch (err) {
			console.error(':: Error connecting to WebSocket: ', err);
		}
	};

	const getMessages = () => {
		try {
			if (socket.current?.readyState === WebSocket.OPEN) {
				socket.current.send(
					JSON.stringify({
						type: 'getMessages',
						page: currentPage,
						pageSize,
						chatId: chat.id,
					})
				);
			}
		} catch (error) {
			console.error('Error fetching messages:', error);
			setHasMoreMessages(false);
		}
	};

	const loadMoreMessages = () => {
		if (hasMoreMessages) {
			setCurrentPage(prevPage => prevPage + 1);
			getMessages();
			setIsMessagesLoading(true);
		}
	};

	const editMessage = (message: IMessage) => {
		try {
			if (socket.current?.readyState === WebSocket.OPEN) {
				socket.current.send(
					JSON.stringify({
						type: 'editMessage',
						message,
					})
				);
			}
		} catch (error) {
			console.error('Error fetching messages:', error);
			setHasMoreMessages(false);
		}
	};

	const updateMessageStatus = (messageId: number, status: Status) => {
		try {
			if (socket.current?.readyState === WebSocket.OPEN) {
				socket.current.send(
					JSON.stringify({
						type: 'updateMessageStatus',
						messageId,
						status,
					})
				);
			}
		} catch (err) {
			console.error('Error fetching messages:', err);
			setHasMoreMessages(false);
		}
	};

	useEffect(() => {
		connectToSocket();

		return () => socket.current?.close();
	}, [currentPage]);

	return {
		socket,
		isConnected,
		getMessages,
		loadMoreMessages,
		editMessage,
		updateMessageStatus,
		hasMoreMessages,
		pageSize,
		lastMessageInPageIndex,
		setLastMessageInPageIndex,
	};
};
