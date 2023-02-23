import { Module } from "@nestjs/common";
import { EmployeeController } from "@app/employee/employee.controller";
import { EmployeeService } from "@app/employee/employee.service";
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
