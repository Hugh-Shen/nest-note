import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../shared/services/user.service';
import { UserResponseDto } from '../shared/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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

  async signIn(username: string, password: string): Promise<UserResponseDto> {
    const result = await this.validateUser(username, password);

    // 登录成功
    return result;
  }
}
