import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';
import { DeviceEntity } from "@app/device/device.entity";
// import { ArticleEntity } from "@app/article/article.entity";

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => DeviceEntity, (device) => device.inCharge)
  devices: DeviceEntity[];
}