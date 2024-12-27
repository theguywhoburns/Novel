import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  host: process.env.DATABASE_HOST || "postgresdb", // Use service name
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || "novel",
});

export { pool as db };
