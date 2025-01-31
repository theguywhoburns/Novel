
import { URL } from 'url';
import { WebSocketServer } from 'ws';

class WSS {
	constructor(expressServer) {
		this.wss = new WebSocketServer({ port: 4100, path: '/api/ws' });
		this.expressServer = expressServer;
		this.onlineUsers = new Map();
	}

	start() {
		console.log(`WebSocket server is listening on port ${this.wss.address().port}`);
		this.wss.on('connection', async (ws, req) => {
			console.log('Online Status WebSocket connection established');

			const url = new URL(req.url, `ws://${req.headers.host}`);
			const userId = url.searchParams.get('userId');

			if (!userId) {
				console.log('userId parameter is missing');
				ws.close();
				return;
			}

			ws.userId = userId;
			console.log(`User ID ${userId} connected`);

			this.onlineUsers.set(userId, ws);
			this.sendOnlineStatus();

			ws.on('message', async (message) => {
				const parsedMessage = JSON.parse(message);
				console.log(`Message received from user ${ws.userId}: ${message}`);

				switch (parsedMessage.type) {
					case 'onlineStatus':
						this.sendOnlineStatus();
						break;
					default:
						console.warn(`Unknown message type: ${parsedMessage.type}`);
						break;
				}
			});

			ws.on('error', (err) => {
				console.error(`WebSocket error for user ID ${ws.userId}:`, err);
			});

			ws.on('close', () => {
				console.log(`User ID ${ws.userId} disconnected`);
				this.onlineUsers.delete(ws.userId);
			});
		});
	}

	sendOnlineStatus() {
		const onlineUsersIds = Array.from(this.onlineUsers.keys());
		this.wss.clients.forEach(client => {
			if (client.readyState === client.OPEN) {
				client.send(JSON.stringify({ type: 'onlineStatus', onlineUsersIds }));
			}
		});
	}
}

export default WSS;


