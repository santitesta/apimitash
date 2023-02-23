import { stateEnum } from "../types/stateEnum.type";

export class UpdateOrderDto {
  readonly state: stateEnum;

  readonly description: string;
}