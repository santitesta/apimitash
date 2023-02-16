import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { EmployeeService } from "@app/employee/employee.service";
import { CreateEmployeeDto } from "@app/employee/dto/createEmployee.dto";
import { EmployeeResponseInterface } from "@app/employee/types/employeeResponse.interface";
import { UpdateEmployeeDto } from "@app/employee/dto/updateEmployee.dto";
import { Employee } from "@app/employee/decorators/employee.decorator";
import { EmployeeEntity } from "@app/employee/employee.entity";
import { AuthGuard } from "@app/employee/guards/auth.guard";
import { LoginEmployeeDto } from "./dto/loginEmployee.dto";

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Create employee
  @Post("employee")
  @UsePipes(new ValidationPipe())
  async createEmployee(
    @Body("employee") createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeResponseInterface> {
    const employee = await this.employeeService.createEmployee(
      createEmployeeDto
    );
    return this.employeeService.buildEmployeeResponse(employee);
  }

  // Login
  @Post("employee/login")
  @UsePipes(new ValidationPipe())
  async login(
    @Body("employee") loginDto: LoginEmployeeDto
  ): Promise<EmployeeResponseInterface> {
    const employee = await this.employeeService.login(loginDto);
    return this.employeeService.buildEmployeeResponse(employee);
  }

  // Get current employee
  @Get("employee")
  @UseGuards(AuthGuard)
  async currentEmployee(
    @Employee() employee: EmployeeEntity
  ): Promise<EmployeeResponseInterface> {
    return this.employeeService.buildEmployeeResponse(employee);
  }

  // Get all employees
  @Get("employees")
  async getAllEmployees(): Promise<EmployeeEntity[]> {
    return await this.employeeService.getAllEmployees();
  }

  //Update employee
  @Put("employee")
  @UseGuards(AuthGuard)
  async updateCurrentEmployees(
    @Employee("id") currentEmployeeId: number,
    @Body("employee") updateEmployeeDto: UpdateEmployeeDto
  ): Promise<EmployeeResponseInterface> {
    const employee = await this.employeeService.updateEmployee(
      currentEmployeeId,
      updateEmployeeDto
    );
    return this.employeeService.buildEmployeeResponse(employee);
  }
}
