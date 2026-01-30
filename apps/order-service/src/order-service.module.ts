import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'oreemmanuel',
      password: '',
      database: 'marketplace',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrdersModule,
  ],
})
export class OrderServiceModule {}
