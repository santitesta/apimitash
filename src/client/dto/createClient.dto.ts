import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  readonly company: string;

  readonly address: string;

  readonly phone: number;

  readonly openTime: string;

  readonly cuit: number;

  readonly paymentEmail: string; // Gotta add @IsEmail()

  readonly treasuryPhone: string; //Gotta change it to number

}