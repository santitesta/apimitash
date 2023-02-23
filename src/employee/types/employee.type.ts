import { EmployeeEntity } from "../employee.entity";

export type EmployeeType = Omit<EmployeeEntity, 'hashPassword'>