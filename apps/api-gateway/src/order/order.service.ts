import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type CreateOrderResponse = {
  message: string;
  orderId: string;
};

@Injectable()
export class OrderService {
  private ORDER_SERVICE_URL = 'http://localhost:3002';

  constructor(private readonly http: HttpService) {}

  async createOrder(data: {
    userId: string;
    amount: number;
  }): Promise<CreateOrderResponse> {
    const response = await firstValueFrom(
      this.http.post<CreateOrderResponse>(
        `${this.ORDER_SERVICE_URL}/orders`,
        data,
      ),
    );

    return response.data;
  }
}
