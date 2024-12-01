import { useMessengerStore } from '@/store/messenger/useMessengerStore';
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

	const wsPort = 4200;
	const wsUrl = `ws://localhost:${wsPort}/api/ws`;

	useEffect(() => {
		console.log('test effect triggered');
	}, []);

	const connectToSocket = () => {
		socket.current = new WebSocket(wsUrl);

		socket.current.onopen = () => {
			setIsConnected(true);
			console.log(':: Socket open');

			if (socket.current?.readyState === WebSocket.OPEN) {
				console.log(':: Socket is ready');
				console.log(':: Fetching messages');
				getMessages();
			}
		};

		socket.current.onmessage = event => {
			const message = JSON.parse(event.data);
			console.log(':: Socket MESSAGE: ', message);

			switch (message.type) {
				case 'getMessages':
					console.log('messages page length: ', message.messages.length);
					setHasMoreMessages(message.messages.length === pageSize);
					setLastMessageInPageIndex(message.messages.length - 1);

					setTimeout(() => {
						setMessages(prev => [...message.messages, ...prev]);
						setIsMessagesLoading(false);
					}, 300);
					break;
				default:
					console.log('default');
					console.log('MESSAGE:', message);
					setMessages(prev => [...prev, message]);
					break;
			}
			console.log('messages updated');
		};

		socket.current.onclose = () => {
			setIsConnected(false);
			console.log(':: Socket close');
		};

		socket.current.onerror = error => {
			console.log(':: Socket error: ', error);
		};
	};

	const getMessages = () => {
		if (socket.current?.readyState === WebSocket.OPEN) {
			socket.current.send(
				JSON.stringify({
					type: 'getMessages',
					page: currentPage,
					pageSize,
					chatId: chat.id,
				})
			);
			console.log('current page: ', currentPage);
		}
	};

	const loadMoreMessages = () => {
		if (hasMoreMessages) {
			setCurrentPage(prevPage => prevPage + 1);
			getMessages();
			setIsMessagesLoading(true);
			console.log('load more called'.toUpperCase());
		}
	};

	useEffect(() => {
		connectToSocket();

		return () => socket.current?.close();
	}, [currentPage]);

	return {
		socket,
		isConnected,
		loadMoreMessages,
		hasMoreMessages,
		pageSize,
		lastMessageInPageIndex,
		setLastMessageInPageIndex,
	};
};
