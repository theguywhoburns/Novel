import { WebSocketServer } from 'ws';
import { db } from "../db.js";

class WebSocketChatServer {
	constructor(expressServer) {
		this.wss = new WebSocketServer({ port: 4200, path: '/api/ws' });
		this.expressServer = expressServer;
	}

	start() {
		console.log(`WebSocket server is listenting on port ${this.wss.address().port}`);
		this.wss.on('connection', async (ws) => {
			console.log('WebSocket connection established');
			ws.on('message', async (message) => {
				const parsedMessage = JSON.parse(message);

				switch (parsedMessage.type) {
					case 'getMessages':
						await this.getMessages(ws, parsedMessage.page || 1, parsedMessage.pageSize || 20, parsedMessage.chatId);
						break;

					case 'editMessage':
						await this.editMessage(ws, parsedMessage);
						break;

					case 'updateMessageStatus':
						await this.updateMessageStatus(ws, parsedMessage?.messageId, parsedMessage?.status);
						break;

					default:
						const formattedMessages = await this.storeNewMessage(parsedMessage);
						this.broadcastMessage(ws, formattedMessages);
						break;
				}
			});
		});
	}

	broadcastMessage(ws, message, excludeClient) {
		try {
			this.wss.clients.forEach((client) => {
				if (client !== excludeClient && client.readyState === client.OPEN) {
					client.send(JSON.stringify(message));

					if (message.status !== 'read') {
						this.updateMessageStatus(ws, message?.id, 'sent', message?.replyToMessage);
					}
				}
			});

		} catch (error) {
			console.error('Error broadcasting message:', error);
		}
	}

	async storeNewMessage(message) {
		try {
			const result = await db.query(
				'INSERT INTO messages ("senderId", "recipientId", "chatId", type, text, "createdAt", status, "replyToMessageId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
				[message.senderId, message.recipientId, message.chatId, message.type, message.text, new Date(), message.status, message.replyToMessageId]
			);

			const newMessage = result.rows[0];


			let replyToMessage = null;
			if (newMessage?.replyToMessageId) {
				const replyResult = await db.query(
					'SELECT * FROM messages WHERE id = $1',
					[newMessage.replyToMessageId]
				);
				replyToMessage = replyResult.rows[0] || null;
			}

			return this.formatMessage(newMessage, replyToMessage);
		} catch (err) {
			console.error('Error storing message:', err);
		}
	}

	async getMessages(ws, page = 1, pageSize = 20, chatId) {
		try {
			const messages = await this.retrieveMessages(chatId, page, pageSize);
			ws.send(JSON.stringify({ type: 'getMessages', messages }));
		} catch (err) {
			console.error('Error getting messages:', err);
		}
	}

	async retrieveMessages(chatId, page, pageSize) {
		try {
			const offset = (page - 1) * pageSize;

			const result = await db.query(
				`
					SELECT m.*, r.id AS "replyId", r.text AS "replyText", r."senderId" AS "replySenderId", r."createdAt" AS "replyCreatedAt"
					FROM messages m
					LEFT JOIN messages r ON m."replyToMessageId" = r.id
					WHERE m."chatId" = $1
					ORDER BY m."createdAt" DESC 
					LIMIT $2 OFFSET $3
				`,
				[chatId, pageSize, offset]
			);

			return result.rows.map(row => this.formatMessage(row, {
				id: row.replyId,
				text: row.replyText,
				senderId: row.replySenderId,
				createdAt: row.replyCreatedAt,
				replyToMessageId: row.replyToMessageId
			})).reverse();
		} catch (err) {
			console.error('Error retrieving messages:', err);
		}
	}

	async updateMessage(message, replyToMessage) {
		try {
			const { id, text } = message.message;

			const result = await db.query(
				'UPDATE messages SET text = $1 WHERE id = $2 RETURNING *',
				[text, id]
			);

			if (result.rows.length === 0) {
				throw new Error(`Message with ID ${id} not found`);
			} const editedMessage = result.rows[0];

			return this.formatMessage(editedMessage, replyToMessage);
		} catch (err) {
			console.error('Error updating message:', err);
		}
	}

	async updateMessageStatus(ws, messageId, status, replyToMessage) {
		try {
			const result = await db.query(
				'UPDATE messages SET status = $1 WHERE id = $2 RETURNING *',
				[status, messageId]
			);

			const formattedMessage = this.formatMessage(result.rows[0], replyToMessage);

			ws.send(JSON.stringify({ type: 'updateMessageStatus', message: formattedMessage }));
		} catch (err) {
			console.error('Error updating message status:', err);
		}
	}


	async editMessage(ws, message) {
		try {
			const editedMessage = await this.updateMessage(message, message.message.replyToMessage);
			ws.send(JSON.stringify({ type: 'editMessage', message: editedMessage }));
		} catch (error) {
			console.error('Error editing message:', error);
		}
	}

	formatMessage(message, replyToMessage) {
		return {
			id: message?.id,
			chatId: message?.chatId,
			senderId: message?.senderId,
			recipientId: message?.recipientId,
			type: message?.type,
			text: message?.text,
			createdAt: new Date(message?.createdAt),
			status: message?.status,
			replyToMessage: replyToMessage ? replyToMessage : null
		};
	}
}

export default WebSocketChatServer;