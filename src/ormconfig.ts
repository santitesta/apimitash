import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigModule } from "@nestjs/config";

let host: string;
let nodeEnv: string = process.env.NODE_ENV;
if (nodeEnv === "development") {
  ConfigModule.forRoot();
  host = "localhost";
} else {
  ConfigModule.forRoot();
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
