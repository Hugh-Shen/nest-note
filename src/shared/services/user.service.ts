import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { MysqlService } from './mysql.service';

@Injectable()
export class UserService extends MysqlService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
