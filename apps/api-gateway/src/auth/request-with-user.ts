export type JwtUser = {
  sub: string;
  email: string;
};

export type RequestWithUser = {
  user: JwtUser;
};
