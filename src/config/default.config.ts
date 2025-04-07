// 定义默认配置对象
export const defaultConfig = {
  environment: 'development',
  port: 3000,
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'cms',
    synchronize: true,
    logging: false,
  },
  jwt: {
    secret: 'jwt_secret',
    expiresIn: '1h',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

// 从默认配置生成类型
export type AppConfig = typeof defaultConfig;
