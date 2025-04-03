import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: '用户登录' })
  async signIn(@Body() user: LoginDto) {
    const { username, password } = user;
    return await this.authService.signIn(username, password);
  }
}
