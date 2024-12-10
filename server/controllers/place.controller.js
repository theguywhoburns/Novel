import { db } from "../db.js";

class PlaceController {
	async addPlace(req, res) {
		try {
			const {
				address,
				postalCode,
				cityName,
				geoLat,
				geoLon,
				population,
				foundationYear,
			} = req.body;

			const foundTown = await db.query(
				`SELECT * FROM cities WHERE "address" ILIKE $1 AND ("postalCode" = $2 OR "cityName" = $3) LIMIT 1`,
				[`%${address}%`, postalCode, cityName]
			);

			if (!foundTown.rowCount) {
				res.status(404).json({ message: 'The city was not found.' });
				throw new Error(`The town with the specified address ${address}, postal code ${postalCode} or city name ${cityName} was not found.`);
			}

			const newPlace = await db.query(
				`INSERT INTO places ("address", "postalCode", "cityName", "geoLat", "geoLon", "population", "foundationYear")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
				[address, postalCode, cityName, geoLat, geoLon, population, foundationYear]
			);

			res.status(201).json(newPlace.rows[0]);
		} catch (err) {
			console.error(error);
			res.status(500).json({ error: err.message });
		}
	}

	async getPlacesByCityName(req, res) {
		try {
			const cityName = req.params.cityName;

			const cityId = await db.query('SELECT id FROM cities WHERE "address" ILIKE $1', ["%" + cityName + "%"]);

			const places = await db.query('SELECT * FROM places WHERE "cityId" = $1', [cityId.rows[0].id]);

			const categorizedPlaces = places.rows.reduce((acc, place) => {
				switch (place.categoryId) {
					case 1:
						acc.cafe.push(place);
						break;
					case 2:
						acc.bar.push(place);
						break;
					case 3:
						acc.parks.push(place);
						break;
					case 4:
						acc.movie.push(place);
						break;
					case 5:
						acc.exhibition.push(place);
						break;
					default:
						acc.others.push(place);
						break;
				}
				return acc;
			}, { cafe: [], bar: [], parks: [], movie: [], exhibition: [], others: [] });

			res.json(categorizedPlaces);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}

	async getPlaceById(req, res) {
		try {
			const id = req.params.id;

			const place = await db.query('SELECT * FROM places WHERE id = $1', [id]);

			if (!place.rowCount) {
				return res.status(404).json({ message: 'Place with the specified ID not found.' });
			}

			res.json(place.rows[0]);
		} catch (err) {
			console.error(error);
			res.status(500).json({ error: err.message });
		}
	}
}

export default new PlaceController();
