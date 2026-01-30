import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { PayDto } from './dto/pay.dto';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtUser } from './auth/jwt-user.type';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: PayDto })
  pay(@Body() body: PayDto, @Req() req: Request) {
    const user = req.user as JwtUser;

    return this.paymentService.pay(body.orderId, user.userId, body.amount);
  }
}
