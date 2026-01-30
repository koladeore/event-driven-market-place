import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './orders/order.entity';
import { OrderEventsController } from './order-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController, OrderEventsController],
  providers: [OrdersService],
})
export class OrdersModule {}
