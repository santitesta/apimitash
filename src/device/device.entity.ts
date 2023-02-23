import { ClientEntity } from "@app/client/client.entity";
import { OrderEntity } from "@app/order/order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "devices" })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  type: string;

  @ManyToOne(() => ClientEntity, (client) => client.devices, { eager: true })
  owner: ClientEntity;

  @OneToMany(() => OrderEntity, (order) => order.device)
  orders: OrderEntity[];
}
