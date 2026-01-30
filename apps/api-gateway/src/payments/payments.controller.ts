import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import type { RequestWithUser } from '../auth/request-with-user';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  pay(
    @Req() req: RequestWithUser,
    @Body() body: { orderId: string; amount: number },
  ) {
    return this.paymentsService.pay({
      orderId: body.orderId,
      userId: req.user.sub,
      amount: body.amount,
    });
  }
}
