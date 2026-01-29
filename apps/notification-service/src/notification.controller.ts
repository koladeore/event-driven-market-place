import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ORDER_EVENTS, PAYMENT_EVENTS } from '@app/events';
import type { OrderCreatedEvent, PaymentSuccessfulEvent } from '@app/events';

@Controller()
export class NotificationController {
  @EventPattern(ORDER_EVENTS.ORDER_CREATED)
  handleOrderCreated(@Payload() data: OrderCreatedEvent) {
    console.log('📩 ORDER_CREATED event received:', data);

    // later: send email / push notification
    return;
  }
  @EventPattern(PAYMENT_EVENTS.PAYMENT_SUCCESSFUL)
  handlePaymentSuccessful(@Payload() data: PaymentSuccessfulEvent) {
    console.log('💰 PAYMENT_SUCCESSFUL event received:', data);
  }
}
