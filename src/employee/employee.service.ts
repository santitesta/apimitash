import { ConfigModule } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { CreateEmployeeDto } from "@app/employee/dto/createEmployee.dto";
import { EmployeeEntity } from "@app/employee/employee.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { EmployeeResponseInterface } from "./types/employeeResponse.interface";
import { HttpException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import { LoginEmployeeDto } from "./dto/loginEmployee.dto";
import { compare } from "bcrypt";
import { UpdateEmployeeDto } from "./dto/updateEmployee.dto";
ConfigModule.forRoot();

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ) {}

  // Create employee
  async createEmployee(
    createEmployeeDto: CreateEmployeeDto
  ): Promise<EmployeeEntity> {
    const employeeByEmail = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email },
    });
    const employeeByUsername = await this.employeeRepository.findOne({
      where: { username: createEmployeeDto.username },
    });
    if (employeeByEmail || employeeByUsername) {
      throw new HttpException(
        "Email or username are taken",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const newEmployee = new EmployeeEntity();
    Object.assign(newEmployee, createEmployeeDto);
    return await this.employeeRepository.save(newEmployee);
  }

  // Get employee by Id
  async findById(id: number): Promise<EmployeeEntity> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  // Get all employees
  async getAllEmployees(): Promise<EmployeeEntity[]> {
    return await this.employeeRepository.find();
  }

  // Login
  async login(loginEmployeeDto: LoginEmployeeDto): Promise<EmployeeEntity> {
    const employee = await this.employeeRepository.findOne({
      where: {
        email: loginEmployeeDto.email,
      },
      select: ["id", "username", "email", "password"],
    });

    if (!employee) {
      throw new HttpException(
        "Credentials are not valid",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const isPasswordCorrect = await compare(
      loginEmployeeDto.password,
      employee.password
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        "Credentials are not valid",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    delete employee.password;
    return employee;
  }

  // Update employee
  async updateEmployee(
    employeeId: number,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<EmployeeEntity> {
    const employee = await this.findById(employeeId);
    Object.assign(employee, updateEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  generateJwt(employee: EmployeeEntity): string {
    return sign(
      {
        id: employee.id,
        username: employee.username,
        email: employee.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }

  buildEmployeeResponse(employee: EmployeeEntity): EmployeeResponseInterface {
    return {
      employee: {
        ...employee,
        token: this.generateJwt(employee),
      },
    };
  }
}
