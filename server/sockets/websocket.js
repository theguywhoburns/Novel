import { WebSocketServer } from 'ws';
import { db } from "../db.js";

class WebSocketChatServer {
	constructor(expressServer) {
		this.wss = new WebSocketServer({ port: 4200, path: '/api/ws' });
		this.expressServer = expressServer;
	}

	start() {
		this.wss.on('connection', (ws) => {
			ws.on('message', (message) => {
				message = JSON.parse(message);
				if (message.type === 'getMessages') {
					this.getMessages(ws);
				} else {
					this.broadcastMessage(message, ws);
					this.storeMessage(message);
				}
			});
		});
	}

	broadcastMessage(message, excludeClient) {
		this.wss.clients.forEach((client) => {
			if (client !== excludeClient) {
				client.send(JSON.stringify(message));
			}
		});

		console.log('LENGTH: ', this.wss.clients.size);
	}

	async storeMessage(message) {
		try {
			const result = await db.query(
				'INSERT INTO messages (id, "senderId", "recipientId", "chatId", type, text, "createdAt", status, "replyToMessageId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
				[message.id, message.senderId, message.recipientId, message.chatId, message.type, message.text, message.createdAt, message.status, message.replyToMessageId]
			);
			return result;
		} catch (error) {
			console.error('Error storing message:', error);
			throw error;
		}
	}

	async getMessages(ws) {
		try {
			const result = await this.retrieveMessages();
			ws.send(JSON.stringify({ type: 'messages', messages: result.rows }));
		} catch (error) {
			console.error('Error retrieving messages:', error);
		}
	}

	async retrieveMessages() {
		// Use the Express.js server's database connection to retrieve messages
		const result = await db.query('SELECT * FROM messages');
		return result;
	}
}

export default WebSocketChatServer;