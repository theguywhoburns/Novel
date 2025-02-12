import { config as dotenvConfig } from "dotenv-esm";
import fs from "fs";
import pg from "pg";
import { getDotenvVariable } from "./utils/utils.js";

dotenvConfig();

const { Pool } = pg;

const pool = new Pool({
  user: getDotenvVariable(process.env.DB_USER),
  password: getDotenvVariable(process.env.DB_PASSWORD),
  host: getDotenvVariable(process.env.DB_HOST),
  port: getDotenvVariable(process.env.DB_PORT),
  database: getDotenvVariable(process.env.DB_NAME),
});

pool.query(fs.readFileSync("database.sql", "utf-8"));

export { pool as db };
