import { IsEmail, IsOptional } from "class-validator";

export class UpdateClientDto {
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  readonly company: string;

  readonly address: string;

  readonly phone: number;

  readonly openTime: string;

  readonly cuit: number;

  readonly paymentEmail: string;

  readonly treasuryPhone: string;
}