import { applyDecorators } from '@nestjs/common';
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';

export class UserDto {
  @IsUsername()
  username: string;

  @IsPassword()
  password: string;

  @ApiProperty({ example: 'zhangsan@example.com', description: '邮箱地址' })
  @IsEmail()
  email: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}

export class UserResponseDto extends OmitType(UserDto, ['password']) {
  constructor(partial: Partial<UserDto>) {
    super();

    const filter = ['id', 'username', 'email'];

    filter.forEach((key) => {
      if (partial[key] !== undefined) {
        this[key] = partial[key] as unknown;
      }
    });
  }

  @Expose()
  @ApiProperty({ example: 1, description: '用户ID' })
  id: number;
}

// 用户名验证装饰器
function IsUsername(): PropertyDecorator {
  return applyDecorators(
    IsString(),
    Matches(/^[^\u4e00-\u9fa5]*$/, { message: '用户名不能包含中文字符' }),
    ApiProperty({ example: 'username', description: '用户名' }),
  );
}

// 密码验证装饰器
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
