import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '@/config/dbConfig';
import { UserEntity } from './entity/user.entity';
import { UserService } from './services/user.service';
import { UserController } from '@/api/controllers/user/user.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dbConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity])],
})
export class SharedModule {
  constructor() {}
}
