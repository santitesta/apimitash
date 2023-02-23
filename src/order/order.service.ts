import { ConfigModule } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from './order.entity';
import { OrderResponseInterface } from './types/orderResponse.interface';
import { DeviceEntity } from '@app/device/device.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
ConfigModule.forRoot();

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  // Create order
  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const device = await this.deviceRepository.findOne({
      where: { id: createOrderDto.deviceId },
    });

    if (!device) {
      throw new HttpException(
        'Device does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newOrder = new OrderEntity();
    Object.assign(newOrder, {
      description: [createOrderDto.description],
      device,
    });
    return await this.orderRepository.save(newOrder);
  }

  // TBD: query builder
  // Get order by Id
  async findById(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOne({ where: { id } });
  }

  // Get all orders
  async getAllOrders(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  // Update order
  async updateOrder(
    orderId: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findById(orderId);

    if (!order) {
      throw new HttpException(
        'Order does not exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    Object.assign(order, {
      ...updateOrderDto,
      description: [...order.description, updateOrderDto.description],
    });

    return await this.orderRepository.save(order);
  }

  buildOrderResponse(order: OrderEntity): OrderResponseInterface {
    return { order };
  }
}
