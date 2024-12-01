import { WebSocketServer } from 'ws';
import { db } from "../db.js";

class WebSocketChatServer {
	constructor(expressServer) {
		this.wss = new WebSocketServer({ port: 4200, path: '/api/ws' });
		this.expressServer = expressServer;
	}

	start() {
		this.wss.on('connection', async (ws) => {
			ws.on('message', async (message) => {
				message = JSON.parse(message);
				console.log(':: Socket MESSAGE: ', message);
				if (message.type === 'getMessages') {
					await this.getMessages(ws, message.page || 1, message.pageSize || 20, message.chatId);
				} else {
					const formattedMessages = await this.storeNewMessage(message);
					console.log('unfmt msg: ', message);
					console.log("formattedMessages: ", formattedMessages);
					this.broadcastMessage(formattedMessages);
				}
			});
		});
	}

	broadcastMessage(message, excludeClient) {
		this.wss.clients.forEach((client) => {
			if (client !== excludeClient && client.readyState === client.OPEN) {
				client.send(JSON.stringify(message));
			}
		});
		console.log('Clients connected: ', this.wss.clients.size);
	}

	async storeNewMessage(message) {
		console.log('storeNewMessage: ', message);
		try {
			const result = await db.query(
				'INSERT INTO messages ("senderId", "recipientId", "chatId", type, text, "createdAt", status, "replyToMessageId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
				[message.senderId, message.recipientId, message.chatId, message.type, message.text, new Date(), message.status, message.replyToMessageId]
			);

			const newMessage = result.rows[0];
			console.log('newMessage: ', newMessage);

			let replyToMessage = null;
			if (newMessage?.replyToMessageId) {
				const replyResult = await db.query(
					'SELECT * FROM messages WHERE id = $1',
					[newMessage.replyToMessageId]
				);
				replyToMessage = replyResult.rows[0] || null;
			}
			const formattedMessage = {
				id: newMessage.id,
				chatId: newMessage.chatId,
				senderId: newMessage.senderId,
				recipientId: newMessage.recipientId,
				type: newMessage.type,
				text: newMessage.text,
				createdAt: newMessage.createdAt,
				status: newMessage.status,
				replyToMessage: replyToMessage ? {
					id: replyToMessage.id,
					chatId: replyToMessage.chatId,
					senderId: replyToMessage.senderId,
					recipientId: replyToMessage.recipientId,
					type: replyToMessage.type,
					text: replyToMessage.text,
					createdAt: replyToMessage.createdAt,
					status: replyToMessage.status,
					replyToMessageId: replyToMessage.replyToMessageId
				} : null
			};
			console.log("MESSAGE WITH ID: ", formattedMessage);
			return formattedMessage;
		} catch (error) {
			console.error('Error storing message:', error);
			throw error;
		}
	}

	async getMessages(ws, page = 1, pageSize = 20, chatId) {
		try {
			const messages = await this.retrieveMessages(chatId, page, pageSize);
			ws.send(JSON.stringify({ type: 'getMessages', messages }));
		} catch (error) {
			console.error('Error retrieving messages:', error);
		}
	}

	async retrieveMessages(chatId, page, pageSize) {
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

		const messages = result.rows.map(row => ({
			id: row.id,
			chatId: row.chatId,
			senderId: row.senderId,
			recipientId: row.recipientId,
			type: row.type,
			text: row.text,
			createdAt: new Date(row.createdAt),
			status: row.status,
			replyToMessageId: row.replyToMessageId,
			replyToMessage: row.replyId ? {
				id: row.replyId,
				chatId: row.chatId,
				senderId: row.replySenderId,
				recipientId: row.recipientId,
				type: row.type,
				text: row.replyText,
				status: row.status,
				createdAt: row.replyCreatedAt,
				replyToMessageId: row.replyToMessageId
			} : null
		}));

		return messages.reverse();
	}
}

export default WebSocketChatServer;