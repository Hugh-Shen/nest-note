import { applyDecorators } from '@nestjs/common';
import { IsString, IsEmail, MinLength } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '张三', description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456', description: '密码' })
  @IsPassword()
  @Expose()
  password: string;

  @ApiProperty({ example: 'zhangsan@example.com', description: '邮箱地址' })
  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(UserDto) {
  @ApiProperty({ example: 1, description: '用户ID' })
  @Type(() => Number)
  id?: number;
}

export class UserResponseDto extends OmitType(UserDto, ['password']) {
  @ApiProperty({ example: 1, description: '用户ID' })
  id: number;
}

// 修改密码验证装饰器
function IsPassword(): PropertyDecorator {
  return applyDecorators(
    IsString(),
    MinLength(6),
    // 添加Swagger描述
    ApiProperty({
      example: '123456',
      description: '密码至少6位',
      minLength: 6,
    }),
  );
}
