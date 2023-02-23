import { EmployeeEntity } from "@app/employee/employee.entity";
import { Request } from "express";

export interface ExpressRequest extends Request {
  employee?: EmployeeEntity;
}
