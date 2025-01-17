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
        res.status(404).json({ message: "The city was not found." });
        throw new Error(
          `The town with the specified address ${address}, postal code ${postalCode} or city name ${cityName} was not found.`
        );
      }

      const newPlace = await db.query(
        `INSERT INTO places ("address", "postalCode", "cityName", "geoLat", "geoLon", "population", "foundationYear")
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          address,
          postalCode,
          cityName,
          geoLat,
          geoLon,
          population,
          foundationYear,
        ]
      );

      res.status(201).json(newPlace.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getPlaceByCoords(req, res) {
    try {
      const geoLat = parseFloat(req.params.geoLat);
      const geoLon = parseFloat(req.params.geoLon);
      const searchDistance = parseFloat(req.params.searchDistance);

      if (isNaN(geoLat) || isNaN(geoLon) || isNaN(searchDistance)) {
        res
          .status(400)
          .json({ error: "Invalid coordinates or search distance" });
        return;
      }

      const allPlaces = await db.query("SELECT * FROM places");

      const nearbyPlaces = allPlaces.rows.filter((place) => {
        const distance = getDistanceFromCoordinatesInKm(
          geoLat,
          geoLon,
          place.geoLat,
          place.geoLon
        );
        return distance <= searchDistance;
      });

      if (nearbyPlaces.length === 0) {
        res
          .status(404)
          .json({ error: "No places found in the specified distance" });
        return;
      }

      res.json(nearbyPlaces);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getPlacesByCityName(req, res) {
    try {
      const cityName = req.params.cityName;
      const places = await db.query(
        'SELECT * FROM places WHERE "cityName" = $1',
        [cityName]
      );

      const categorizedPlaces = places.rows.reduce(
        (acc, place) => {
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
        },
        { cafe: [], bar: [], parks: [], movie: [], exhibition: [], others: [] }
      );
      res.json(categorizedPlaces);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  async getPlaceById(req, res) {
    try {
      const id = req.params.id;

      const place = await db.query("SELECT * FROM places WHERE id = $1", [id]);

      if (!place.rowCount) {
        return res
          .status(404)
          .json({ message: "Place with the specified ID not found." });
      }

      res.json(place.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}

export default new PlaceController();
