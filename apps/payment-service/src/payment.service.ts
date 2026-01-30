import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Repository } from 'typeorm';
import {
  PAYMENT_EVENTS,
  PaymentSuccessfulEvent,
  PaymentFailedEvent,
} from '@app/events';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'order_payment_queue', // IMPORTANT (Order service will listen here)
        queueOptions: { durable: true },
      },
    });
  }

  async pay(orderId: string, userId: string, amount: number) {
    // simulate payment success/fail
    const success = Math.random() > 0.5;

    await this.client.connect();

    if (!success) {
      const failedEvent: PaymentFailedEvent = {
        orderId,
        userId,
        amount,
        reason: 'Insufficient funds',
        failedAt: new Date().toISOString(),
      };

      this.client.emit(PAYMENT_EVENTS.PAYMENT_FAILED, failedEvent);

      return {
        message: 'Payment failed',
        status: 'FAILED',
      };
    }

    const payment = this.paymentRepo.create({ orderId, userId, amount });
    const savedPayment = await this.paymentRepo.save(payment);

    const successEvent: PaymentSuccessfulEvent = {
      paymentId: savedPayment.id,
      orderId: savedPayment.orderId,
      userId: savedPayment.userId,
      amount: savedPayment.amount,
      paidAt: savedPayment.paidAt.toISOString(),
    };

    this.client.emit(PAYMENT_EVENTS.PAYMENT_SUCCESSFUL, successEvent);

    return {
      message: 'Payment successful',
      payment: savedPayment,
    };
  }
}
