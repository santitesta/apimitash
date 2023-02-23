import { EmployeeType } from "./employee.type";

export interface EmployeeResponseInterface {
  employee: EmployeeType & { token: string };
}
