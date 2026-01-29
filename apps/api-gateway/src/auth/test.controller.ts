import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

type JwtUser = {
  userId: string;
  email: string;
};

@Controller('test')
export class TestController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected(@Req() req: Request) {
    return {
      message: 'You are authenticated',
      user: req.user as JwtUser,
    };
  }
}
