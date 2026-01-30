import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [AuthModule, OrderModule, PaymentsModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
