import { DeviceEntity } from "@app/device/device.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "clients" })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column()
  openTime: string;

  @Column({ type: "bigint" })
  cuit: string;

  @Column()
  paymentEmail: string;

  @Column()
  treasuryPhone: string;

  @OneToMany(() => DeviceEntity, (device) => device.owner)
  devices: DeviceEntity[];
}
