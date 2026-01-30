import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderService } from './order.service';
import type { RequestWithUser } from '../auth/request-with-user';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: RequestWithUser, @Body() body: { amount: number }) {
    // userId comes from token
    return this.orderService.createOrder({
      userId: req.user.sub,
      amount: body.amount,
    });
  }
}
