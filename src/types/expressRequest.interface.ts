import { EmployeeEntity } from "@app/user/employee.entity";
import { Request } from "express";

export interface ExpressRequest extends Request {
  employee?: EmployeeEntity;
}
