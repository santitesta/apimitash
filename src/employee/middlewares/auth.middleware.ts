import { ConfigModule } from "@nestjs/config";
import { ExpressRequest } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { EmployeeService } from "../employee.service";
ConfigModule.forRoot();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly employeeService: EmployeeService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.employee = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = verify(token, process.env.JWT_SECRET) as {
        id: number;
        username: string;
        email: string;
      };
      const employee = await this.employeeService.findById(decode.id);
      req.employee = employee;
      next();
    } catch (error) {
      req.employee = null;
      next();
    }
  }
}
