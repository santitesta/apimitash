import { Module } from "@nestjs/common";
import { ClientController } from "@app/client/client.controller";
import { ClientService } from "@app/client/client.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "./client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService]
})
export class UserModule { }