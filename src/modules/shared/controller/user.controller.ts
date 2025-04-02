import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UserService } from '@/modules/shared/services/user.service';
import { UserDto, UpdateUserDto } from '@/modules/shared/dtos/user.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@ApiTags('users')
@Controller('users')
@Injectable()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: '用户创建成功',
    type: UserDto,
  })
  async create(@Body() userData: UserDto) {
    try {
      const result = await this.userService.create(userData);
      return result;
    } catch (error: unknown) {
      // 记录错误日志
      this.logger.error('Failed to create user', {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息' })
  @ApiResponse({ status: 200, description: '删除用户成功' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '更新用户成功' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.update(id, userData);
  }

  @Get()
  @ApiOperation({ summary: '获取全部用户信息' })
  async findAll() {
    return this.userService.paginate(1, 10);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      // 使用i18n翻译错误消息
      throw new NotFoundException('user.notFound');
    }

    return user;
  }
}
