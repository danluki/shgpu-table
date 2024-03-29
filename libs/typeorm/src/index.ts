import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '../../.env') });

import "reflect-metadata";
import { DataSource } from "typeorm";

import { Faculty } from "./entities/faculty";
import { Group } from "./entities/group";
import { Pair } from "./entities/pair";

export * from "typeorm";
export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.MAINBASE_POSTGRES_URL,
    entities: [Group, Pair, Faculty],
    migrations: ['src/migrations/*.ts'],
    migrationsTableName: 'typeorm_migrations',
    synchronize: true,
});