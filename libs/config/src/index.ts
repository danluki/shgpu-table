import {resolve} from "path";

import * as dotenv from "dotenv";
import {bool, cleanEnv, str} from "envalid";

try {
    dotenv.config({path: resolve(process.cwd(), "../../.env")});
} catch {}

export const config = cleanEnv(
    process.env, {
        ADMIN_POSTGRES_URL: str({
            default: "postgres://postgres:admin@localhost:5432/shgpu_table_admin",
        }),
        NODE_ENV: str({choices: ["development", "production"], default: "development"}),
        API_URL: str({default: "http://localhost:3002"}),
        API_URL_WS: str({default: "ws://localhost:3002"}),
        JWT_SECRET: str({default: "CoolSecretForJWT"}),
        REDIS_URL: str({default: "redis://localhost:6379"}),
        STORAGE_PATH: str({default: "/home/danluki/Projects/shgpu-table/apps/parser/storage/"}),
        MAINBASE_POSTGRES_URL: str({default: "postgres://postgres:admin@localhost:5432/shgpu_table"}),
        TGBOT_POSTGRES_URL: str({default: "postgres://postgres:admin@localhost:5433/shgpu_table_bot"}),
        TELEGRAM_KEY: str({default: "THIS KEY WILL NOT WORK"}),
    }
)