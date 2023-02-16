import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Employee = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.employee) {
      return null;
    }

    if (data) {
      return request.employee[data];
    }

    return request.employee;
  }
);
