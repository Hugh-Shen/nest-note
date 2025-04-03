import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from '@/modules/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@/config/jwt.config';
import { JwtGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { TokenService } from './services/token.service';

@Module({
  imports: [SharedModule, JwtModule.register(jwtConfig())],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthModule {}
