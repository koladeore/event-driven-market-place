import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './orders/order.entity';
import { OrderEventsController } from './order-events.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersController, OrderEventsController],
  providers: [OrdersService, JwtStrategy],
})
export class OrdersModule {}
