import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { JwtPayload } from '../constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  // 生成并存储令牌
  async generateToken(payload: JwtPayload): Promise<string> {
    const token = this.jwtService.sign(payload);

    // 存储到 Redis，使用用户ID作为键的一部分
    const key = `auth:token:${payload.sub}`;
    const expiresIn = 3600; // 1小时，可以根据需要调整

    // 存储令牌到 Redis
    await this.redis.set(key, token, 'EX', expiresIn);

    return token;
  }

  // 验证令牌是否有效
  async validateToken(token: string): Promise<JwtPayload | null> {
    try {
      // 先验证 JWT 签名
      const payload = this.jwtService.verify<JwtPayload>(token);

      // 检查 Redis 中是否存在该令牌
      const key = `auth:token:${payload.sub}`;
      const storedToken = await this.redis.get(key);

      // 如果 Redis 中不存在或与当前令牌不匹配，则认为无效
      if (!storedToken || storedToken !== token) {
        return null;
      }

      return payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }

  // 使令牌失效
  async invalidateToken(userId: number): Promise<void> {
    const key = `auth:token:${userId}`;
    await this.redis.del(key);
  }
}
