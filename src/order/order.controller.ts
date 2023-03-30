import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { OrderResponseInterface } from "./types/orderResponse.interface";
import { OrderService } from "./order.service";
import { OrderEntity } from "./order.entity";
import { UpdateOrderDto } from "./dto/updateOrder.dto";

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Create order
  @Post("order")
  @UsePipes(new ValidationPipe())
  async createOrder(
    @Body("order") createOrderDto: CreateOrderDto
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.createOrder(createOrderDto);
    return this.orderService.buildOrderResponse(order);
  }

  // Get order by id
  @Get("order/:id")
  async getOrderById(
    @Param("id") orderId: number
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.findById(orderId);
    return this.orderService.buildOrderResponse(order);
  }

  // Get all orders
  @Get("orders")
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderService.getAllOrders();
  }

  //Update order
  @Put("order/update/:id")
  async updateOrder(
    @Param("id") orderId: number,
    @Body("order") updateOrderDto: UpdateOrderDto
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.updateOrder(orderId, updateOrderDto);
    return this.orderService.buildOrderResponse(order);
  }

  //Assign employee
  @Put("order/assign")
  async assignEmployee(
    @Body("orderId") orderId: number,
    @Body("employeeId") employeeId: number
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.assignEmployee(orderId, employeeId);
    return this.orderService.buildOrderResponse(order);
  }
}
