import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from "./employee.entity";
import config from "@app/ormconfig";

describe("EmployeeController", () => {
  let employeeController: EmployeeController;
  let module: TestingModule;

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
  });

  afterAll(async () => {
    await module.close();
  });

  it("should have a createEmployee function", () => {
    expect(typeof employeeController.createEmployee).toBe("function");
  });
});
