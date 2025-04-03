export interface JwtPayload {
  username: string;
  sub: number;
  [key: string]: any;
}

export const jwtConstants = {
  secret: 'secret',
};
