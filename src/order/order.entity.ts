import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceEntity } from "@app/device/device.entity";
import { stateEnum } from "./types/stateEnum.type";
import { EmployeeEntity } from "@app/user/employee.entity";

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["abierta", "en progreso", "espera respuestos", "cerrada"],
    default: "abierta",
  })
  state: stateEnum;

  @Column("simple-array")
  description: string[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @ManyToOne(() => DeviceEntity, (device) => device.orders)
  device: DeviceEntity;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.orders, {
    eager: true,
  })
  employee: EmployeeEntity;
}
