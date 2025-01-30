import { db } from "../db.js";

class LikesController {
	async getMatches(req, res) {
		try {
			const userId = req.params.id;

			if (!userId) {
				res.status(400).json({ error: 'User ID not found' });
			}

			const matchesResult = await db.query(
				`SELECT
          u.id,
          u.name,
          u."uploadedImages",
          DATE_PART('year', AGE("bDate")) as age
        FROM users u
        JOIN likes l1 ON u.id = l1."raterId"
        WHERE l1."ratedId" = $1
          AND EXISTS (
            SELECT 1
            FROM likes l2
            WHERE l2."raterId" = $1 AND l2."ratedId" = l1."raterId"
          )`,
				[userId]
			);

			const matches = matchesResult.rows;

			res.json(matches);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async getMyLikes(req, res) {
		try {
			const userId = req.params.id;

			if (!userId) {
				res.status(400).json({ error: 'User ID not found' });
			}

			const myLikesResult = await db.query(
				`SELECT 
          u.id, 
    	     u.name,
           u."uploadedImages", 
          DATE_PART('year', AGE("bDate")) as age
        FROM users u
        JOIN likes l ON u.id = l."raterId"
  	    WHERE l."ratedId" = $1`,
				[userId]
			);

			const myLikes = myLikesResult.rows;

			res.json(myLikes);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	async getLikedPartners(req, res) {
		try {
			const userId = req.params.id;

			if (!userId) {
				res.status(400).json({ error: 'User ID not found' });
			}

			const likedPartnersResult = await db.query(
				`SELECT 
					u.id, 
					u.name,
					u."uploadedImages", 
					DATE_PART('year', AGE("bDate")) as age
			  FROM users u
			  JOIN likes l ON u.id = l."ratedId"
			  WHERE l."raterId" = $1`,
				[userId]
			);

			const likedPartners = likedPartnersResult.rows;

			res.json(likedPartners);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};

export default new LikesController();;;