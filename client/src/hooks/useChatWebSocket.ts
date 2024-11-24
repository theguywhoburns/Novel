import { useMessengerStore } from '@/store/messenger/useMessengerStore';
import { useEffect, useRef, useState } from 'react';

export const useChatWebSocket = () => {
	const [isConnected, setIsConnected] = useState(false);
	const socket = useRef<WebSocket | null>(null);

	const wsPort = 4200;
	const wsUrl = `ws://localhost:${wsPort}/api/ws`;

	let reconnectTimeout: NodeJS.Timeout | null = null;

	const messages = useMessengerStore(state => state.messages);
	const setMessages = useMessengerStore(state => state.setMessages);

	useEffect(() => {
		console.log('test effect triggered');
	}, []);

	const connectToSocket = () => {
		socket.current = new WebSocket(wsUrl);

		console.log('effect triggered');

		socket.current.onopen = () => {
			setIsConnected(true);
			console.log(':: Socket open');

			if (socket.current?.readyState === WebSocket.OPEN) {
				console.log(':: Socket is ready');
			} else {
				console.log('WebSocket is not ready to send data');
			}
		};

		socket.current.onmessage = event => {
			console.log(':: Socket message');
			console.log('event data', event.data);

			const message = JSON.parse(event.data);
			console.log([...messages, message]);
			setMessages(prev => [...prev, message]);

			console.log('messages updated');
		};

		socket.current.onclose = () => {
			setIsConnected(false);
			console.log(':: Socket close');
			reconnect();
		};

		socket.current.onerror = error => {
			console.log(':: Socket error: ', error);
		};
	};

	useEffect(() => {
		connectToSocket();
	}, []);

	const reconnect = () => {
		if (reconnectTimeout) {
			clearTimeout(reconnectTimeout);
		}

		reconnectTimeout = setTimeout(() => {
			connectToSocket();
		}, 5000); // Try to reconnect every 5 seconds
	};

	return { socket, isConnected };
};
