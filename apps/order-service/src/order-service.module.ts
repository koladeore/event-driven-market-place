import { Module } from '@nestjs/common';
import { OrdersModule } from './order.module';

@Module({
  imports: [OrdersModule],
})
export class OrderServiceModule {}
