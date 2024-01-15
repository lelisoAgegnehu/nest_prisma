import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.userId, username: user.username };

    return {
      userId: user.userId,
      username: user.username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
