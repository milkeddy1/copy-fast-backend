import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    //find user by username
    const user = await this.usersService.findOne(username);
    const decryptPassword = await bcrypt.compare(pass, user.password);

    if (!decryptPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      // 這裡做了一個簡單的加密，將 user id 和 username 加密成 token
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string): Promise<any> {
    // 目前只會希望有一個帳號所以做一個檢查，如果已經有帳號就不給註冊
    const userAmount = await this.prismaService.user.count();
    if (userAmount > 0) {
      throw new UnauthorizedException('你不能註冊');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    return await this.usersService.create({
      username,
      hashedPassword,
    });
  }
}
