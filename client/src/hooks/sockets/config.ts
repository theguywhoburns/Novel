import { UserId } from '@/store/login/useLoginStore';
import {getServerUrl} from '@/utils/serverUrl';
const chatWsPort = 4200;
const onlineStatusWsPort = 4100;

const wsBaseUrl = `ws://${getServerUrl()}:`;

export const getWsUrl = (userId: UserId, type: 'chat' | 'online-status') => {
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
