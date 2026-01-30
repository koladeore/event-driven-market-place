import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() body: { userId: string; amount: number }) {
    return this.ordersService.createOrder(body.userId, body.amount);
  }
}
