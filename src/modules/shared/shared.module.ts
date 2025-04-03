import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '@/config/db.config';
import { winstonConfig } from '@/config/winston.config';
import { UserEntity } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserController } from '@/modules/shared/controller/user.controller';
import { WinstonModule } from 'nest-winston';
import { RedisModule } from '@nestjs-modules/ioredis';
import { redisConfig } from '@/config/redis.config';

@Global()
@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: redisConfig,
    }),
    WinstonModule.forRootAsync({
      useFactory: winstonConfig,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
    TypeOrmModule.forFeature([UserEntity]),
    WinstonModule, // 导出 WinstonModule，使其在其他模块中可用
    RedisModule,
  ],
})
export class SharedModule {
  constructor() {}
}
