import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly password: string;
}