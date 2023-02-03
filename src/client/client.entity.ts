import { DeviceEntity } from '@app/device/device.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clients' })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column()
  openTime: string;

  @Column()
  cuit: number;

  @Column()
  paymentEmail: string;

  @Column()
  treasuryPhone: string;

  @OneToMany(() => DeviceEntity, (device) => device.owner)
  devices: DeviceEntity[];
}
