import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "@app/ormconfig";
import { EmployeeModule } from "./user/employee.module";
import { ClientModule } from "./client/client.module";
import { DeviceModule } from "./device/device.module";
import { OrderModule } from "./order/order.module";
import { AuthMiddleware } from "./user/middlewares/auth.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    EmployeeModule,
    ClientModule,
    DeviceModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL,
    });
  }
}
