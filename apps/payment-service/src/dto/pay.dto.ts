import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class PayDto {
  @ApiProperty({
    example: 'a6bb9a2c-93e3-44c0-807b-170c24d525d0',
    description: 'Order ID to pay for',
  })
  @IsString()
  orderId: string;

  @ApiProperty({
    example: 25000,
    description: 'Payment amount',
  })
  @IsNumber()
  @Min(1)
  amount: number;
}
