import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { PAYMENT_EVENTS, PaymentSuccessfulEvent } from '@app/events';

@Injectable()
export class PaymentService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'notification_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async pay(orderId: string, userId: string, amount: number) {
    const paymentId = Date.now().toString();

    const event: PaymentSuccessfulEvent = {
      paymentId,
      orderId,
      userId,
      amount,
      paidAt: new Date().toISOString(),
    };

    await this.client.connect();
    this.client.emit(PAYMENT_EVENTS.PAYMENT_SUCCESSFUL, event);

    return {
      message: 'Payment successful',
      paymentId,
    };
  }
}
