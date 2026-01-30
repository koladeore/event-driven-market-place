import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtUser } from './auth/jwt-user.type';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateOrderDto })
  createOrder(@Body() body: CreateOrderDto, @Req() req: Request) {
    const user = req.user as JwtUser;

    return this.ordersService.createOrder(user.userId, body.amount);
  }
}
