import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { ORDER_EVENTS, OrderCreatedEvent } from '@app/events';
import { Order, OrderStatus } from './orders/order.entity';

@Injectable()
export class OrdersService {
  private client: ClientProxy;

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
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
    const order = this.orderRepo.create({
      userId,
      amount,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.orderRepo.save(order);

    const event: OrderCreatedEvent = {
      orderId: savedOrder.id,
      userId: savedOrder.userId,
      amount: savedOrder.amount,
      createdAt: savedOrder.createdAt.toISOString(),
    };

    await this.client.connect();
    this.client.emit(ORDER_EVENTS.ORDER_CREATED, event);

    return {
      message: 'Order created',
      order: savedOrder,
    };
  }
  async markOrderAsPaid(orderId: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) throw new Error(`Order ${orderId} not found`);

    order.status = OrderStatus.PAID;
    await this.orderRepo.save(order);

    console.log(`🟢 Order ${orderId} updated to PAID`);
    // optionally emit an event for order updated
    return order;
  }
  async cancelOrder(orderId: string, reason: string) {
    console.log('Cancelling order:', orderId, 'Reason:', reason);
    await this.orderRepo.update(
      { id: orderId },
      { status: OrderStatus.CANCELLED },
    );
  }
}
