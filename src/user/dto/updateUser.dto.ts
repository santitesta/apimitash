import { IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto {
  readonly username: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  readonly role: string;
}