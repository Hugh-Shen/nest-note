import { DataSourceOptions } from 'typeorm';

export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '123456',
  database: 'cms',
  port: 3306,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false,
};
