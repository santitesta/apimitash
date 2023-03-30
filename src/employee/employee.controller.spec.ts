import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";
import config from "@app/ormconfig";
import { Repository } from "typeorm";

describe("EmployeeController", () => {
  let employeeController: EmployeeController;
  let module: TestingModule;
  let employeeRepository: Repository<EmployeeEntity>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([EmployeeEntity]),
      ],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeRepository = module.get("EmployeeEntityRepository");
  });

  afterAll(async () => {
    await module.close();
  });

  it("should have a createEmployee function", () => {
    expect(typeof employeeController.createEmployee).toBe("function");
  });

  it("should save an employee to the database", async () => {
    const employee = new EmployeeEntity();
    employee.username = "javierdos";
    employee.password = "asdf";
    employee.role = "maestranza";
    employee.email = "javierdos@example.com";

    const savedEmployee = await employeeRepository.save(employee);
    expect(savedEmployee.id).toBeDefined();
    expect(savedEmployee.username).toBe(employee.username);
    expect(savedEmployee.email).toBe(employee.email);
  });
});
