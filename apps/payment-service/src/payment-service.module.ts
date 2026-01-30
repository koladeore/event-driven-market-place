import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './auth/jwt.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, JwtStrategy],
})
export class PaymentServiceModule {}
