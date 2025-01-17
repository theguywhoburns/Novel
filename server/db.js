import { config as dotenvConfig } from "dotenv-esm";
import { getDotenvVariable } from "./utils/utils.js";
import pg from "pg";
import fs from "fs";

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
