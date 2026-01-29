import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { ORDER_EVENTS, OrderCreatedEvent } from '@app/events';

@Injectable()
export class OrdersService {
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

  async createOrder(userId: string, amount: number) {
    const orderId = Date.now().toString();

    const event: OrderCreatedEvent = {
      orderId,
      userId,
      amount,
      createdAt: new Date().toISOString(),
    };

    await this.client.connect();
    this.client.emit(ORDER_EVENTS.ORDER_CREATED, event);

    return {
      message: 'Order created',
      orderId,
    };
  }
}
