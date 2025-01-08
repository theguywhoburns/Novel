import { db } from "../db.js";

class SettingsController {
	async getSettingsByUser(req, res) {
		try {
			const userId = req.params.id;

			if (!userId) {
				return res.status(400).json({ error: "Missing id" });
			}

			const settingsResult = await db.query(
				`SELECT   
					*,
					range_to_inclusive_string("distanceRange") as "distanceRange",
					range_to_inclusive_string("ageRange") as "ageRange"
 				FROM settings WHERE "userId" = $1`,
				[userId]
			);

			const settings = settingsResult.rows[0];

			if (!settings) {
				return res.status(404).json({ error: "Settings not found" });
			}

			res.json(settings);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}

	updateSettings = async (req, res) => {
		try {
			const id = req.params.id;

			if (!id) {
				return res.status(400).json({ err: "Missing id" });
			}
			const settingsResult = await db.query(
				"SELECT * FROM settings WHERE id = $1",
				[id]
			);
			const settings = settingsResult.rows[0];

			if (!settings) {
				return res.status(404).json({ err: "Settings not found" });
			}

			const fieldsToUpdate = [];
			const values = [id];
			let index = 2; // Start at 2 because $1 is used for the id

			for (const [key, value] of Object.entries(req.body)) {
				if (settings.hasOwnProperty(key)) {
					fieldsToUpdate.push(`"${key}" = $${index}`);
					values.push(value);
					index++;
				}
			}

			if (!fieldsToUpdate.length) {
				return res.status(400).json({ err: "No valid fields to update" });
			}

			const updateQuery = `
        UPDATE settings SET 
        ${fieldsToUpdate.join(", ")} 
        WHERE id = $1
      `;

			const updatedSettingsResult = await db.query(updateQuery, values);

			const newSettingsResult = await db.query(
				`SELECT 	
					*,
					range_to_inclusive_string("distanceRange") as "distanceRange",
					range_to_inclusive_string("ageRange") as "ageRange"
				 FROM settings WHERE id = $1`,
				[id]
			);
			const updatedSettings = newSettingsResult.rows[0];

			res.json(updatedSettings);
		} catch (err) {
			console.error(err);
			res.status(500).json({ err: "Internal Server Error" });
		}
	};
}

export default new SettingsController();
