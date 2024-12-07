import { db } from "../db.js";
import { capitalize } from "../utils/utils.js";

class UserController {
  async getUser(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ error: "Missing id" });
      }
      const user = await db.query("SELECT * FROM person WHERE id = $1", [id]);

      if (!user) {
        return res.status(400).json({ error: "No user found" });
      }

      const { name, surname, city, country } = user.rows[0];

      const capitalizedUser = {
        ...user.rows[0],
        name: capitalize(name),
        city: capitalize(city),
        country: capitalize(country),
        surname: capitalize(surname),
      };

      res.json(capitalizedUser);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateUser(req, res) {
    try {
      const {
        id,
        login,
        name,
        surname,
        age,
        city,
        country,
        hobby,
        friendsAmount,
        followersAmount,
        musicAmount,
        postsAmount,
      } = req.body;

      if (!Object.entries(req.body).one(([_, value]) => value)) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const user = await db.query(
        'UPDATE person SET login = $1, name = $2, surname = $3, age = $4, city = $5, country = $6, hobby = $7, "friendsAmount" = $8, "followersAmount" = $9, "musicAmount" = $10, "postsAmount" = $11 WHERE id = $12 RETURNING *',
        [
          login,
          name,
          surname,
          age,
          city,
          country,
          hobby,
          friendsAmount,
          followersAmount,
          musicAmount,
          postsAmount,
          id,
        ]
      );

      if (!user) {
        return res.status(400).json({ error: "No user updated" });
      }

      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async patchUser(req, res) {
    try {
      const { id, name, surname, age, city, country, hobby } = req.body;

      if (!Object.entries(req.body).some(([_, value]) => value)) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const user = await db.query(
        "UPDATE person SET name = $1, surname = $2, age = $3, city = $4, country = $5, hobby = $6 WHERE id = $7 RETURNING *",
        [name, surname, age, city, country, hobby, id]
      );

      if (!user) {
        return res.status(400).json({ error });
      }

      res.json(user.rows[0]);
    } catch (error) {

      res.status(500).json({ error });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({ error: "Missing id" });
      }

      await db.query('DELETE FROM post WHERE "userId" = $1', [id]);

      const user = await db.query("DELETE FROM person WHERE id = $1", [id]);

      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default new UserController();
