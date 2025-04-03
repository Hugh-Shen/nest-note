import { RedisModuleOptions } from '@nestjs-modules/ioredis';

export const redisConfig = (): RedisModuleOptions => {
  return {
    type: 'single',
    options: {
      host: 'localhost',
      port: 6379,
    },
  };
};
