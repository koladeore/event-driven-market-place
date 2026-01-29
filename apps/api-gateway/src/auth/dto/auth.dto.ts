export type RegisterRequestDto = {
  email: string;
  password: string;
};

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type RegisterResponseDto = {
  message: string;
};

export type LoginResponseDto = {
  access_token: string;
};
