import { AppConfig, defaultConfig } from './default.config';
import { merge } from 'lodash';

export default () => {
  // 获取环境变量
  const environment = process.env.NODE_ENV || 'development';

  const envConfig = {
    environment,
    port: parseInt(process.env.APP_PORT || '3000', 10),
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return merge({}, defaultConfig, envConfig) as AppConfig;
};
