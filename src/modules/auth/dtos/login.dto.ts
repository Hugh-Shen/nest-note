import { PickType } from '@nestjs/swagger';
import { UserDto } from '@/modules/shared/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto extends PickType(UserDto, [
  'username',
  'password',
] as const) {
  @ApiProperty({ description: '用户登录凭证', example: '用户名' })
  username: string;
}
