import { db } from "../db.js";

class NewPairController {
	async getNewPairsByUser(req, res) {
		try {
			const userId = req.params.id;

			if (!userId) {
				res.status(400).json({ error: 'User ID not found' });
			}

			const newPairsResult = await db.query(
				`SELECT 
					u.id, 
					u.name,
					u."uploadedImages", 
					DATE_PART('year', AGE("bDate")) as age
        FROM users u
          JOIN likes l ON u.id = l."raterId"
          WHERE l."ratedId" = $1 AND NOT EXISTS (
            SELECT 1
            FROM likes l2
            WHERE l2."raterId" = $1 AND l2."ratedId" = u.id
         )`,
				[userId]
			);

			const newPairs = newPairsResult.rows;

			res.json(newPairs);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};

export default new NewPairController();
