import fs from "fs";
import { PGlite } from "@electric-sql/pglite";

if (!fs.existsSync("./assets/database.db/")) {
  PGlite.create("./assets/database.db/");
}
const db = new PGlite("./assets/database.db/");
db.exec(fs.readFileSync("database.sql", "utf-8"));

export { db };
