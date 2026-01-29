import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  private AUTH_SERVICE_URL = 'http://localhost:3001';

  constructor(private readonly http: HttpService) {}

  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const response = await firstValueFrom(
      this.http.post<RegisterResponseDto>(
        `${this.AUTH_SERVICE_URL}/auth/register`,
        data,
      ),
    );
    return response.data;
  }

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await firstValueFrom(
      this.http.post<LoginResponseDto>(
        `${this.AUTH_SERVICE_URL}/auth/login`,
        data,
      ),
    );
    return response.data;
  }
}
