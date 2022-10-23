import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: "shgpu-table",
});

export default pool;
