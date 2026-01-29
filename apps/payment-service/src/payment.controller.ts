import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  pay(@Body() body: { orderId: string; userId: string; amount: number }) {
    return this.paymentService.pay(body.orderId, body.userId, body.amount);
  }
}
