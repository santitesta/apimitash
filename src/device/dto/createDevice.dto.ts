import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  readonly serialNumber: string;

  @IsNotEmpty()
  readonly type: string;
}
