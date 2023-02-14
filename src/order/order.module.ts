import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderController } from '@app/order/order.controller';
import { OrderService } from '@app/order/order.service';
import { DeviceEntity } from '@app/device/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, DeviceEntity])],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
