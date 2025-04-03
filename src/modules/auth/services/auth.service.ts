import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../shared/services/user.service';
import { UserResponseDto } from '../../shared/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  // 在验证用户方法中
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('密码错误');
    }
    return new UserResponseDto(user);
  }

  async signIn(username: string, password: string) {
    const user = await this.validateUser(username, password);

    // 生成 JWT
    const payload = { username: user.username, sub: user.id };
    const token = await this.tokenService.generateToken(payload);
    const formattedToken = `Bearer ${token}`;

    // 登录成功
    return { ...user, token: formattedToken };
  }

  async signOut(userId: number): Promise<void> {
    await this.tokenService.invalidateToken(userId);
  }
}
