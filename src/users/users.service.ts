import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create({
    username,
    hashedPassword,
  }: {
    username: string;
    hashedPassword: string;
  }) {
    // 先檢查是否有相同的 username
    try {
      // 先檢查用戶是否存在
      const existsUser = await this.prismaService.user.findUnique({
        where: {
          username: username,
        },
      });

      if (existsUser) {
        throw new ConflictException('Username already exists');
      }

      // 創建用戶
      return await this.prismaService.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    } catch (error) {
      // 處理其他可能的錯誤
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
