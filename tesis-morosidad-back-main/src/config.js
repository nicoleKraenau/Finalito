export const db = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "intento3",
  ssl: process.env.SSL || "no",
};

export const port = process.env.PORT || 4000;
