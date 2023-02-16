import { Module } from "@nestjs/common";
import { EmployeeController } from "@app/user/employee.controller";
import { EmployeeService } from "@app/user/employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, AuthGuard],
  exports: [EmployeeService],
})
export class EmployeeModule {}
