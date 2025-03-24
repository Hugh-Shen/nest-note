import { Injectable } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class MysqlService<T extends { id: number }> {
  constructor(protected repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.repository.save(entity as T);
  }

  async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T> {
    await this.repository.update(id, entity);
    return this.findById(id) as Promise<T>;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async paginate(page = 1, limit = 10): Promise<{ data: T[]; total: number }> {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }
}
