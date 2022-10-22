import mariadb from "mariadb";

const pool = mariadb.createConnection({
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
});

export default pool;
