import { useOnlineStatusStore } from '@/store/onlineStatus/useOnlineStatusStore';
import { useEffect, useRef, useState } from 'react';
import { getWsUrl } from './config';

export const useOnlineWebSocket = () => {
	const socket = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const setOnlineUsersIds = useOnlineStatusStore(
		state => state.setOnlineUsersIds
	);

	const connectToSocket = () => {
		try {
			socket.current = new WebSocket(getWsUrl('online-status'));
			console.log(getWsUrl('online-status'));

			console.log('ONLINE STATUS WS OPENED');

			socket.current.onopen = () => {
				console.log('Connected to WebSocket');
				setIsConnected(true);

				if (socket.current?.readyState === WebSocket.OPEN) {
					console.log(':: Socket opened');
				}
			};

			socket.current.onmessage = event => {
				const message = JSON.parse(event.data);

				console.log('message', message);

				switch (message.type) {
					case 'onlineStatus':
						setOnlineUsersIds(message.onlineUsersIds);
						break;

					default:
						console.error('Unknown message type:', message.type);
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

	useEffect(() => {
		connectToSocket();

		return () => {
			if (socket.current) {
				socket.current.close();
			}
		};
	}, []);

	return {
		isConnected,
	};
};
