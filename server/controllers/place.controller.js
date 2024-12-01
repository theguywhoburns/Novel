import { db } from "../db.js";

class PlaceController {
    async addPlace(req, res) {
        const { 
            address, 
            postalCode, 
            cityName, 
            geoLat, 
            geoLon, 
            population, 
            foundationYear 
        } =  req.body;

        const foundTown = await db.query(
            'SELECT * FROM cities WHERE "address" ILIKE $1 AND ("postalCode" = $2 OR "cityName" = $3) LIMIT 1',
            [
                `%${address}%`,
                postalCode,
                cityName
            ]
        );

        const newPlace = await db.query(
            'INSERT INTO places ("address", "postalCode", "cityName", "geoLat", "geoLon", "population", "foundationYear") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [address, postalCode, cityName, geoLat, geoLon, population, foundationYear]
        );

        res.json(newPlace.rows[0]);
    }
}

export default new PlaceController();
