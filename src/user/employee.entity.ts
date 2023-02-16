import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { hash } from "bcrypt";
import { OrderEntity } from "@app/order/order.entity";

@Entity({ name: "users" })
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  role: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => OrderEntity, (order) => order.employee)
  orders: OrderEntity[];
}
