import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ValidationError } from 'class-validator';

export const ExceptionFilter = (app: INestApplication) => {
  // 获取 Winston logger 实例
  const logger = app.get<Logger>(WINSTON_MODULE_PROVIDER);

  return (errors: ValidationError[]) => {
    const messages = errors.map((error) =>
      Object.values(error.constraints || {}).join(', '),
    );

    // 记录验证错误
    logger.error('请求验证失败', {
      errors: errors.map((e) => ({
        property: e.property,
        constraints: e.constraints,
        value: e.value as unknown,
      })),
    });

    return new HttpException(
      { message: messages, error: 'Bad Request' },
      HttpStatus.BAD_REQUEST,
    );
  };
};
