import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UserService } from '@/shared/services/user.service';
import { UserDto, UpdateUserDto } from '@/shared/dtos/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: '用户创建成功',
    type: UserDto,
  })
  async create(@Body() userData: UserDto) {
    return this.userService.create(userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息' })
  @ApiResponse({ status: 200, description: '删除用户成功' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ) {
    return this.userService.update(id, userData);
  }

  @Get()
  @ApiOperation({ summary: '获取全部用户信息' })
  @ApiResponse({ status: 200, description: '获取全部用户信息成功' })
  async findAll() {
    return this.userService.paginate(1, 10);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({ status: 200, description: '获取用户信息成功' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }
}
