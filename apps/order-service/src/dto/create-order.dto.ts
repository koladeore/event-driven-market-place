import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 25000,
    description: 'Order amount in Naira',
  })
  @IsNumber()
  @Min(1)
  amount: number;
}
