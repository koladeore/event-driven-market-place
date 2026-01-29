import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TestController } from './test.controller';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'super-secret-key',
    }),
  ],
  controllers: [AuthController, TestController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
