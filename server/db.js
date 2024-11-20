import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "", // TODO: Env
  password: "", // TODO: Env
  host: "localhost",
  port: "5432",
  database: "soc_net",
});

export { pool as db };
