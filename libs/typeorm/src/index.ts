import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Faculty } from "./entities/faculty";
import { Group } from "./entities/group";
import { Pair } from "./entities/pair";
export * from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Group, Pair, Faculty],
  synchronize: true,
  // logging: true,
});
