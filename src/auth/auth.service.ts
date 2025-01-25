import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  prismaService: any;
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    //find user by username
    const user = await this.usersService.findOne(username);

    // decrypt password
    const compareResult = await bcrypt.compare(pass, user.password);

    // 身份 ok!
    if (user && compareResult) {
      return 'ok';
    }
    return null;
  }

  async signUp(username: string, pass: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    return await this.usersService.create({
      username,
      hashedPassword,
    });
  }
}
