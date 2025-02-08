import { db } from "../db.js";
import { getDistanceFromCoordinatesInKm } from "../utils/utils.js";

class UserController {
  // dev util method
  getUsers = async (req, res) => {
    try {
      const usersResult = await db.query("SELECT * FROM users");
      res.json(usersResult.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  getFilteredUsers = async (req, res) => {
    try {
      const currUserId = req.params.id;

      if (!currUserId) {
        return res.status(400).json({ err: "User ID not found" });
      }

      const {
        distanceRange,
        showPeopleInDistance,
        ageRange,
        showPeopleInAge,
        showVerifiedOnly,
        hideRatedUsersDays = 3,
      } = req.body;

      if (
        distanceRange.length !== 2 ||
        typeof showPeopleInDistance !== "boolean" ||
        ageRange.length !== 2 ||
        typeof showPeopleInAge !== "boolean" ||
        typeof showVerifiedOnly !== "boolean"
      ) {
        return res.status(400).json({ err: "Missing required fields" });
      }

      const currUserCoordinatesResult = await db.query(
        "SELECT lat, lon FROM users WHERE id = $1",
        [currUserId]
      );

      const currUserLat = currUserCoordinatesResult.rows[0].lat;
      const currUserLon = currUserCoordinatesResult.rows[0].lon;

      const minAge = showPeopleInAge ? ageRange[0] : 18;
      const maxAge = showPeopleInAge ? ageRange[1] : 100;

      const minDistance = showPeopleInDistance ? distanceRange[0] : 0;
      const maxDistance = showPeopleInDistance ? distanceRange[1] : 1_000_000;

      const usersResult = await db.query(
        `SELECT 
          u.*, 
          CASE 
            WHEN s."showMeToMen" = TRUE AND s."showMeToWomen" = TRUE
              THEN 'all'
            WHEN s."showMeToMen" = TRUE AND s."showMeToWomen" = FALSE THEN 'male' 
            WHEN s."showMeToWomen" = TRUE AND s."showMeToMen" = FALSE THEN 'female' 
            ELSE NULL
          END AS "genderPreference",
          DATE_PART('year', AGE(u."bDate")) AS age
        FROM 
          users u
        LEFT JOIN 
          settings s ON u.id = s."userId"
        WHERE 
          DATE_PART('year', AGE(u."bDate")) BETWEEN $1 AND $2
          AND ${showVerifiedOnly ? '(u."isVerified" = TRUE)' : "TRUE"}`,
        [minAge, maxAge]
      );

      const users = usersResult.rows;

      console.log('users: ', users);

      const ratedUserIdsResult = await db.query(
        `SELECT "ratedId" FROM (
          SELECT "ratedId", "createdAt" FROM likes WHERE "raterId" = $1
          UNION ALL
          SELECT "ratedId", "createdAt" FROM dislikes WHERE "raterId" = $1
        ) as "ratedUsers"
        WHERE  "createdAt" >= NOW() - INTERVAL '${hideRatedUsersDays} days'`,
        [currUserId]
      );

      const ratedUserIds = ratedUserIdsResult.rows.map(row => row.ratedId);

      console.log('rated: ', ratedUserIds);

      const chatUserIdsResult = await db.query(
        `SELECT "userTwoId" FROM chats WHERE "userOneId" = $1
          UNION
        SELECT "userOneId" FROM chats WHERE "userTwoId" = $1`,
        [currUserId]
      );

      const chatUserIds = chatUserIdsResult.rows.map(
        row => row.userTwoId || row.userOneId
      );

      console.log('chats: ', chatUserIds);

      const currUserGenderResult = await db.query(
        'SELECT gender from users WHERE id = $1',
        [currUserId]
      );

      const currUserGender = currUserGenderResult.rows[0].gender;

      console.log('gender: ', currUserGender);

      if (!currUserGender) {
        res.status(404).json({ error: "Current users's gender not found" });
      }

      const filteredUsers = users.filter(user => {
        if (
          ratedUserIds.includes(user.id) ||
          chatUserIds.includes(user.id) ||
          (currUserGender !== user.genderPreference &&
            user.genderPreference !== 'all')
        ) {
          return false;
        }

        const distanceToUser = getDistanceFromCoordinatesInKm(
          currUserLat,
          currUserLon,
          user.lat,
          user.lon
        );

        console.log('distance: ', distanceToUser);

        return (
          distanceToUser >= minDistance &&
          distanceToUser <= maxDistance &&
          user.id != currUserId
        );
      });

      res.json(filteredUsers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ err: "Missing id" });
      }

      const userResult = await db.query(
        `SELECT 
          *, 
          DATE_PART('year', AGE("bDate")) as age
        FROM users WHERE id = $1`,
        [id]
      );

      const user = userResult.rows[0];

      if (!user) {
        return res.status(404).json({ err: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ err: "Missing id" });
      }

      const userResult = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);

      if (userResult.rows.length === 0) {
        return res.status(404).json({ err: "User not found" });
      }

      const currentUserData = userResult.rows[0];

      const fieldsToUpdate = [];
      const values = [id];
      let index = 2;

      for (const [key, value] of Object.entries(req.body)) {
        if (currentUserData.hasOwnProperty(key)) {
          fieldsToUpdate.push(`"${key}" = $${index}`);
          values.push(value);
          index++;
        }
      }

      if (fieldsToUpdate.length === 0) {
        return res.status(400).json({ err: "No valid fields to update" });
      }

      const updateQuery = `
        UPDATE users SET 
        ${fieldsToUpdate.join(", ")} 
        WHERE id = $1
        RETURNING *;
      `;

      const updatedUserResult = await db.query(updateQuery, values);
      const updatedUser = updatedUserResult.rows[0];

      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "Internal Server Error" });
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

      const isLikeAlreadyAdded = await this.checkIfRateAlreadyAdded(
        "likes",
        raterId,
        ratedId
      );
      if (isLikeAlreadyAdded) {
        return res.status(400).json({ message: "Like already added" });
      }

      const isDislikeAdded = await this.checkPreviosRate(
        "dislikes",
        raterId,
        ratedId
      );
      if (isDislikeAdded) {
        await this.deletePreviosRate("dislikes", raterId, ratedId);
      }

      await this.addRate("likes", raterId, ratedId);

      const isMutualLike = await this.checkMutualRate(
        "likes",
        raterId,
        ratedId
      );

      let isNewChatCreated = false;
      if (isMutualLike) {
        isNewChatCreated = await this.createChatIfNotExists(raterId, ratedId);
      }

      res.json({
        message: "Liked successfully",
        isMutualLike,
        isNewChatCreated,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  dislikeUser = async (req, res) => {
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

      const isDislikeAlreadyAdded = await this.checkIfRateAlreadyAdded(
        "dislikes",
        raterId,
        ratedId
      );
      if (isDislikeAlreadyAdded) {
        return res.status(400).json({ message: "Dislike already added" });
      }

      const isLikeAdded = await this.checkPreviosRate(
        "likes",
        raterId,
        ratedId
      );
      if (isLikeAdded) {
        await this.deletePreviosRate("likes", raterId, ratedId);
      }

      await this.addRate("dislikes", raterId, ratedId);

      res.json({ message: "Disliked successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  checkUsersExist = async (userIds) => {
    const result = await db.query(
      "SELECT * FROM users WHERE id IN ($1, $2)",
      userIds
    );

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
