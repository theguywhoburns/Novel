
import { db } from "../db.js";

class UserController {
  // dev util method
  getUsers = async (req, res) => {
    try {
      const usersResult = await db.query('SELECT * FROM users');
      res.json(usersResult.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  };

  getFilteredUsers = async (req, res) => {
    try {
      const {
        distance,
        showPeopleInDistanse,
        age,
        showPeopleInAge,
        isVerified
      } = req.body;

      if (
        distance.length !== 2 ||
        typeof showPeopleInDistanse === 'undefined' ||
        age.length !== 2 ||
        typeof showPeopleInAge === 'undefined' ||
        typeof isVerified === 'undefined'
      ) {
        return res.status(400).json({ err: "Missing required fields" });
      }

      const minAge = showPeopleInAge ? age[0] : 18;
      const maxAge = showPeopleInAge ? age[1] : 100;

      const minDistance = showPeopleInDistanse ? distance[0] : 0;
      const maxDistance = showPeopleInDistanse ? distance[1] : 100;

      const usersResult = await db.query(
        `SELECT * FROM users WHERE 
          (age >= $1 AND age <= $2) AND 
          (distance >= $3 AND distance <= $4) 
          ${isVerified ? 'AND (isVerified = TRUE)' : ''}`,
        [minAge, maxAge, minDistance, maxDistance]
      );

      const users = usersResult.rows;

      res.json(users);
    } catch (err) {
      res.status(500).json({ err });
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ err: "Missing id" });
      }

      const userResult = await db.query('SELECT * FROM users WHERE id = $1', [id]);

      const user = userResult.rows[0];

      if (!user) {
        return res.status(404).json({ err: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ err });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ err: "Missing id" });
      }

      const {
        uploadedImages,
        description,
        growth,
        intersets,
        searchGoal,
        languages,
        lifeStyle,
        jobPosition,
        company,
        gender,
        orientation
      } = req.body;

      const updatedUserResult = await db.query(
        `UPDATE users SET 
          "uploadedImages" = $1, 
          "description" = $2, 
          "growth" = $3, 
          "intersets" = $4, 
          "searchGoal" = $5, 
          "languages" = $6, 
          "lifeStyle" = $7, 
          "jobPosition" = $8, 
          "company" = $9, 
          "gender" = $10, 
          "orientation" = $11 
        WHERE id = $12`,
        [
          uploadedImages,
          description,
          growth,
          intersets,
          searchGoal,
          languages,
          lifeStyle,
          jobPosition,
          company,
          gender,
          orientation,
          id
        ]
      );

      const updatedUser = updatedUserResult.rows[0];

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ err });
    }
  };

  likeUser = async (req, res) => {
    try {
      const { raterId, ratedId } = req.body;

      if (!raterId || !ratedId) {
        return res.status(400).json({ error: "Missing id" });
      }

      if (raterId === ratedId) {
        return res.status(400).json({ error: "Cannot like yourself" });
      }

      const usersExist = await this.checkUsersExist([raterId, ratedId]);
      if (!usersExist) {
        return res.status(404).json({ error: "User or users not found" });
      }

      const isLikeAlreadyAdded =
        await this.checkIfRateAlreadyAdded('likes', raterId, ratedId);
      if (isLikeAlreadyAdded) {
        return res.status(400).json({ message: "Like already added" });
      }

      const isDislikeAdded = await this.checkPreviosRate('dislikes', raterId, ratedId);
      if (isDislikeAdded) {
        await this.deletePreviosRate('dislikes', raterId, ratedId);
      }

      await this.addRate('likes', raterId, ratedId);
      const isMutualLike = await this.checkMutualRate('likes', raterId, ratedId);

      let isNewChatCreated = false;
      if (isMutualLike) {
        isNewChatCreated = await this.createChatIfNotExists(raterId, ratedId);
      }

      res.json({ message: "Liked successfully", isMutualLike, isNewChatCreated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  disLikeUser = async (req, res) => {
    try {
      const { raterId, ratedId } = req.body;

      if (!raterId || !ratedId) {
        return res.status(400).json({ error: "Missing id" });
      }

      if (raterId === ratedId) {
        return res.status(400).json({ error: "Cannot dislike yourself" });
      }

      const usersExist = await this.checkUsersExist([raterId, ratedId]);
      if (!usersExist) {
        return res.status(404).json({ error: "User or users not found" });
      }

      const isDislikeAlreadyAdded = await this.checkIfRateAlreadyAdded('dislikes', raterId, ratedId);
      if (isDislikeAlreadyAdded) {
        return res.status(400).json({ message: "Dislike already added" });
      }

      const isLikeAdded = await this.checkPreviosRate('likes', raterId, ratedId);
      if (isLikeAdded) {
        await this.deletePreviosRate('likes', raterId, ratedId);
      }

      await this.addRate('dislikes', raterId, ratedId);

      res.json({ message: "Disliked successfully" });
    } catch (err) {
      res.status(500).json({ err });
    }
  };


  checkUsersExist = async (userIds) => {
    const result = await db.query('SELECT * FROM users WHERE id IN ($1, $2)', userIds);
    return result.rowCount === userIds.length;
  };


  checkIfRateAlreadyAdded = async (tableName, raterId, ratedId) => {
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE "raterId" = $1 AND "ratedId" = $2`,
      [raterId, ratedId]
    );
    return result.rowCount > 0;
  };

  addRate = async (tableName, raterId, ratedId) => {
    await db.query(
      `INSERT INTO ${tableName} ("raterId", "ratedId") VALUES ($1, $2)`,
      [raterId, ratedId]
    );
  };

  checkMutualRate = async (tableName, raterId, ratedId) => {
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE "raterId" = $1 AND "ratedId" = $2`,
      [ratedId, raterId]
    );
    return result.rowCount > 0;
  };

  checkPreviosRate = async (tableName, raterId, ratedId) => {
    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE "raterId" = $1 AND "ratedId" = $2`,
      [raterId, ratedId]
    );
    return result.rowCount > 0;
  };

  deletePreviosRate = async (tableName, raterId, ratedId) => {
    await db.query(
      `DELETE FROM ${tableName} WHERE "raterId" = $1 AND "ratedId" = $2`,
      [raterId, ratedId]
    );
  };

  createChatIfNotExists = async (userOneId, userTwoId) => {
    const existingChatResult = await db.query(
      'SELECT * FROM chats WHERE ("userOneId" = $1 AND "userTwoId" = $2) OR ("userOneId" = $2 AND "userTwoId" = $1)',
      [userOneId, userTwoId]
    );

    if (existingChatResult.rowCount) {
      return false;
    }

    const newChatResult = await db.query(
      'INSERT INTO chats ("userOneId", "userTwoId") VALUES ($1, $2) RETURNING *',
      [userOneId, userTwoId]
    );

    return newChatResult.rowCount > 0;
  };
}

export default new UserController();