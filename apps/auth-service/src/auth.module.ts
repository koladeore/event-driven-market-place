import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './users/user.entity';

@Module({
  imports: [
    // TypeORM config (hardcoded)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'oreemmanuel',
      password: '', // hardcoded
      database: 'marketplace',
      entities: [User],
      synchronize: true, // dev only
    }),
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),

    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
