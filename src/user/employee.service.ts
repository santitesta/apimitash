import { ConfigModule } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/employee/dto/createUser.dto';
import { EmployeeEntity} from '@app/employee/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/employeeResponse.interface';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginUserDto } from './dto/loginEmployee.dto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/updateEmployee.dto';
ConfigModule.forRoot();

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly userRepository: Repository<EmployeeEntity>,
  ) {}

  // Create employee
  async createUser(createUserDto: CreateUserDto): Promise<EmployeeEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new EmployeeEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Get employee by Id
  async findById(id: number): Promise<EmployeeEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Get all users
  async getAllUsers(): Promise<EmployeeEntity[]> {
    return await this.userRepository.find();
  }

  // Login
  async login(loginUserDto: LoginUserDto): Promise<EmployeeEntity> {
    const employee = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
      select: ['id', 'username', 'email', 'password'],
    });

    if (!employee) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      employee.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete employee.password;
    return employee;
  }

  // Update employee
  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<EmployeeEntity> {
    const employee = await this.findById(userId);
    Object.assign(employee, updateUserDto);
    return await this.userRepository.save(employee);
  }

  generateJwt(employee: EmployeeEntity): string {
    return sign(
      {
        id: employee.id,
        username: employee.username,
        email: employee.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(employee: EmployeeEntity): UserResponseInterface {
    return {
      employee: {
        ...employee,
        token: this.generateJwt(employee),
      },
    };
  }
}
