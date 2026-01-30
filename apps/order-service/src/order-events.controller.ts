import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PAYMENT_EVENTS } from '@app/events';
import type { PaymentSuccessfulEvent, PaymentFailedEvent } from '@app/events';
import { OrdersService } from './orders.service';

@Controller()
export class OrderEventsController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern(PAYMENT_EVENTS.PAYMENT_SUCCESSFUL)
  async handlePaymentSuccess(@Payload() data: PaymentSuccessfulEvent) {
    console.log('✅ PAYMENT_SUCCESSFUL received in Order Service:', data);

    await this.ordersService.markOrderAsPaid(data.orderId);
  }
  @EventPattern(PAYMENT_EVENTS.PAYMENT_FAILED)
  async handlePaymentFailed(@Payload() data: PaymentFailedEvent) {
    console.log('❌ PAYMENT_FAILED received:', data);
    await this.ordersService.cancelOrder(data.orderId, data.reason);
  }
}
