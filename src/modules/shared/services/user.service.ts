import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { MysqlService } from './mysql.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService extends MysqlService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) protected repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async create(entity: Partial<UserEntity>): Promise<UserEntity> {
    if (entity.email) {
      const existingUser = await this.findByEmail(entity.email);
      if (existingUser) {
        throw new ConflictException('该邮箱已被注册');
      }
    }

    if (entity.email) {
      await super.findByEmail(entity.email);
    }

    if (entity.password) {
      entity.password = await this.hashPassword(entity.password);
    }
    return super.create(entity);
  }

  async update(id: number, entity: Partial<UserEntity>): Promise<UserEntity> {
    if (entity.password) {
      entity.password = await this.hashPassword(entity.password);
    }
    return super.update(id, entity);
  }
}
