import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot();

let host: string; // Assign as default value the host of AWS RDS
if (process.env.NODE_ENV === 'development') {
  host = 'localhost'
}

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: host,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: 'mediumclone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}']
};

export default config;