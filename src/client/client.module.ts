import { Module } from "@nestjs/common";
import { ClientController } from "@app/client/client.controller";
import { ClientService } from "@app/client/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./client.entity";
import { AuthGuard } from "@app/employee/guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientService, AuthGuard],
  exports: [ClientService]
})
export class ClientModule { }