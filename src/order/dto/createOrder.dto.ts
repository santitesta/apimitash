import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly deviceId: number;
}
