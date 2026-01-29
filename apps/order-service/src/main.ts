import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  await app.listen(process.env.port ?? 3002);
}
bootstrap();
