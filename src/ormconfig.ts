import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigModule } from "@nestjs/config";

let host: string = "localhost";
let nodeEnv: string = process.env.NODE_ENV;
ConfigModule.forRoot();

if (nodeEnv !== "development") {
  host = process.env.DB_HOST;
}

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: host,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: "mitash",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
};

export default config;
