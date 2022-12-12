import "reflect-metadata";
import { DataSource } from "typeorm";
import { Pair } from "./entities/pair";
export * from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    Group,
    Pair
  ]
  subscribers: [],
});
