import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExceptionFilter } from './common/handles/exception.handle';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

// 添加 Swagger 配置
const gentorretoSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('用户管理系统 API')
    .setDescription('用户管理接口文档')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc-api', app, document);
};

async function bootstrap() {
  // 创建应用实例并配置日志系统
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger
  gentorretoSwagger(app);

  // 配置全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: ExceptionFilter(app),
    }),
  );

  // 应用全局响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 启用 CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
