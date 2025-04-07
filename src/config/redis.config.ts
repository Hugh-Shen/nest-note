import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RedisModuleOptions,
  RedisModuleOptionsFactory,
} from '@nestjs-modules/ioredis';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  // Implement the required method
  createRedisModuleOptions(): RedisModuleOptions {
    return {
      type: 'single',
      options: {
        host: this.configService.get<string>('redis.host', 'localhost'),
        port: this.configService.get<number>('redis.port', 6379),
        // Add additional Redis configuration options as needed
        retryStrategy: (times) => {
          return Math.min(times * 100, 3000);
        },
      },
    };
  }
}
