import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(OrderServiceModule);
  await app.listen(process.env.PORT ?? 3002);
  // RMQ consumer
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'order_payment_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
