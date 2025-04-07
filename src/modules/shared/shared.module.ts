import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@/config/db.config';
import { winstonConfig } from '@/config/winston.config';
import { UserEntity } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserController } from '@/modules/shared/controller/user.controller';
import { WinstonModule } from 'nest-winston';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '@/config/jwt.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisConfigService } from '@/config/redis.config';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
    }),
    WinstonModule.forRootAsync({
      useFactory: winstonConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [
    UserService,
    TypeOrmModule.forFeature([UserEntity]),
    WinstonModule, // 导出 WinstonModule，使其在其他模块中可用
    JwtModule,
    RedisModule,
  ],
})
export class SharedModule {
  constructor() {}
}
