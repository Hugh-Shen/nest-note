import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 添加 Swagger 配置
const gentorretoSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('用户管理系统 API')
    .setDescription('用户管理接口文档')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  gentorretoSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
