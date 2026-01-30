import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type PayResponse = {
  message: string;
  payment?: any;
  status?: string;
};

@Injectable()
export class PaymentsService {
  private PAYMENT_SERVICE_URL = 'http://localhost:3003';

  constructor(private readonly http: HttpService) {}

  async pay(data: { orderId: string; userId: string; amount: number }) {
    const response = await firstValueFrom(
      this.http.post<PayResponse>(`${this.PAYMENT_SERVICE_URL}/payments`, data),
    );

    return response.data;
  }
}
