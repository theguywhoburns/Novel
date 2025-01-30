import { useLoginStore } from '@/store/login/useLoginStore';

const chatWsPort = 4200;
const onlineStatusWsPort = 4100;

const wsBaseUrl = 'ws://localhost:';

const userId = useLoginStore.getState().userId;

export const getWsUrl = (type: 'chat' | 'online-status') => {
	if (!userId) {
		throw new Error('User ID not found');
	}

	let port;

	switch (type) {
		case 'chat':
			port = chatWsPort;
			break;
		case 'online-status':
			port = onlineStatusWsPort;
			break;
		default:
			throw new Error('Invalid connection type');
	}

	return `${wsBaseUrl}${port}/api/ws?userId=${userId}`;
};
