import { JwtModuleOptions } from '@nestjs/jwt';
import { jwtConstants } from '../modules/auth/constants';

export const jwtConfig = (): JwtModuleOptions => {
  return {
    global: true,
    ...jwtConstants,
    signOptions: { expiresIn: '60s' },
  };
};
