import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres", // TODO: Env
  password: "1111", // TODO: Env
  host: "localhost",
  port: "5432",
  database: "novel",
});

export { pool as db };
