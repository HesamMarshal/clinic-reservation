import { config } from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

config();
config({ path: join(process.cwd(), ".env") });
const { DB_HOST, DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
let dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  synchronize: true,

  entities: ["dist/**/**/**/*.entity{.ts,.js}", "dist/**/**/*.entity{.ts,.js}"],
  // migrations: ["dist/migrations/*{.ts,.js}"],
  // migrationsTableName: "clinic_migration_db",
});

export default dataSource;
