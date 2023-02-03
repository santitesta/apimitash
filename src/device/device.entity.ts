import { ClientEntity } from '@app/client/client.entity';
import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serialNumber: string;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.devices, { eager: true })
  inCharge: UserEntity;

  @ManyToOne(() => ClientEntity, (client) => client.devices, { eager: true })
  owner: ClientEntity;
}
