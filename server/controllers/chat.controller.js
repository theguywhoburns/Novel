import { db } from "../db.js";

class ChatController {
	async getChatsByUser(req, res) {
		try {
			const fromId = req.query.fromId;

			if (!fromId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chats = await db.query('SELECT * FROM chat WHERE "fromId" = $1 OR "toId" = $1', [fromId]);

			if (!chats) {
				return res.status(400).json({ error: "No chats found" });
			}

			res.json(chats.rows);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	async getChatByUsers(req, res) {
		try {
			const fromId = req.query.fromId;
			const toId = req.query.toId;

			if (!fromId || !toId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chat = await db.query('SELECT * FROM chat WHERE ("fromId" = $1 AND "toId" = $2) OR ("fromId" = $2 AND "toId" = $1)', [fromId, toId]);

			if (!chat) {
				return res.status(400).json({ error: "No chat found" });
			}

			res.json(chat.rows);
		} catch (error) {
			res.status(500).json({ error });
		}
	}

	async createChat(req, res) {
		try {
			const { fromId, toId } = req.body;

			if (!fromId || !toId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chat = await db.query('INSERT INTO chat ("fromId", "toId") VALUES ($1, $2) RETURNING *', [fromId, toId]);

			if (!chat) {
				return res.status(400).json({ error: "No chat found" });
			}

			res.json(chat.rows[0]);
		} catch (error) {
			res.status(500).json({ error });
		}
	}
}

export default new ChatController();
