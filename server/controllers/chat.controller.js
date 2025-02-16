import { db } from "../db.js";

class ChatController {
	async getChatsByUser(req, res) {
		try {
			const userId = parseInt(req.params.id);

			if (!userId || isNaN(userId)) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chats = await db.query(
				`
				SELECT
				c.id,
				c."userOneId",
				c."userTwoId",
				c."isMuted",
				(
					SELECT json_build_object(
						'id', m.id,
						'senderId', m."senderId",
						'recipientId', m."recipientId",
						'type', m.type,
						'text', m.text
					)
					FROM messages m
					WHERE m."chatId" = c.id
					ORDER BY m."createdAt" DESC
					LIMIT 1
				) AS "lastMessage",
				(
					SELECT COUNT(*)
					FROM messages
					WHERE "chatId" = c.id
					AND "recipientId" = $1
					AND status = 'sent'
				)::int AS "newMessagesAmount",
				CASE
					WHEN c."userOneId" = $1 THEN
						json_build_object(
							'id', u2.id,
							'name', u2.name,
							'age', EXTRACT(YEAR FROM AGE(u2."bDate"))::INTEGER,
							'imgSrc', u2."uploadedImages",
							'gender', u2.gender,
							'isOnline', u2."isOnline"
						)
					ELSE
						json_build_object(
							'id', u1.id,
							'name', u1.name,
							'age', EXTRACT(YEAR FROM AGE(u1."bDate"))::INTEGER,
							'imgSrc', u1."uploadedImages",
							'gender', u1.gender,
							'isOnline', u1."isOnline"
						)
					END AS "interlocutor"
				FROM
					chats c
				JOIN
					users u1 ON c."userOneId" = u1.id
				JOIN
					users u2 ON c."userTwoId" = u2.id
				WHERE
					c."userOneId" = $1 OR c."userTwoId" = $1
				ORDER BY
					(SELECT MAX(m."createdAt") FROM messages m WHERE m."chatId" = c.id) DESC NULLS LAST;
      `,
				[userId],
			);


			res.json(chats.rows);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	async getChatByUsers(req, res) {
		try {
			const fromId = req.query.fromId;
			const toId = req.query.toId;

			if (!fromId || !toId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chat = await db.query(
				`SELECT * FROM chats 
				WHERE ("fromId" = $1 AND "toId" = $2) OR 
					("fromId" = $2 AND "toId" = $1)`,
				[fromId, toId])
				;

			if (!chat) {
				return res.status(400).json({ error: "No chat found" });
			}

			res.json(chat.rows);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	async createChat(req, res) {
		try {
			const { fromId, toId } = req.body;

			if (!fromId || !toId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const chat = await db.query(
				'INSERT INTO chat ("fromId", "toId") VALUES ($1, $2) RETURNING *',
				[fromId, toId]
			);

			if (!chat) {
				return res.status(400).json({ error: "No chat found" });
			}

			res.json(chat.rows[0]);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	async deleteChat(req, res) {
		try {
			const chatId = req.params.id;

			if (!chatId) {
				res.status(404).json({ error: 'Chat ID not found' });
			}

			await db.query(
				'DELETE from chats where id = $1',
				[chatId]
			);

			res.json({ message: 'Chat deleted successfully' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
}

export default new ChatController();
