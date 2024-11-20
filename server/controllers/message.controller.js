import { db } from "../db.js";

class MessageController {
	async getMessagesByUsers(req, res) {
		try {
			const { fromId, toId, chatId } = req.query;

			if (!Object.entries(req.body).every(([key, value]) => value)) {
				return res.status(400).json({ error: "Missing required fields" });
			}

			const messages = await db.query('SELECT * FROM message WHERE ("fromId" = $1 AND "toId" = $2  AND "chatId" = $3 ) OR ("fromId" = $2 AND "toId" = $1  AND "chatId" = $3 )', [fromId, toId, chatId]);

			if (!messages) {
				return res.status(400).json({ error: "No messages found" });
			}

			const data = { messages: messages.rows, };

			const messagesGroup = Object.values(data.messages.reduce((acc, message) => {
				const date = message.date;
				if (!acc[date]) {
					acc[date] = {
						date,
						messages: []
					};
				}
				acc[date].messages.push(message);
				return acc;
			}, {}));


			res.json(messagesGroup);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	async sendMessage(req, res) {
		try {
			const { chatId, fromId, toId, text, date, time, status } = req.body;

			// if (!Object.entries(req.body).one(([key, value]) => value)) {
			// 	return res.status(400).json({ error: "Missing required fields" });
			// }

			const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			const newDate = new Date();
			const day = newDate.getDate();
			const month = months[newDate.getMonth()];
			const fmtDate = `${month} ${day}`;

			const hours = newDate.getHours().toString().padStart(2, '0');
			const minutes = newDate.getMinutes().toString().padStart(2, '0');
			const fmtTime = `${hours}:${minutes}`;

			const newMessage = await db.query(
				'INSERT INTO message ("chatId", "fromId", "toId", text, date, time, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
				[chatId, fromId, toId, text, date ? date : fmtDate, fmtTime, status]
			);

			if (!newMessage) {
				return res.status(400).json({ error: "No message created" });
			}

			res.json(newMessage.rows[0]);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}

export default new MessageController();
