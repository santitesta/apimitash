if (!process.env.IS_TS_NODE) {
  require("module-alias/register");
}

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(8080);
  console.log("App listening in port 8080");
}
bootstrap();
