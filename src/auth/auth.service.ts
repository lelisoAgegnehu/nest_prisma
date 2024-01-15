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
    const user = await this.usersService.user({ username: username });
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.username };

    return {
      id: user.id,
      username: user.username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string) {
    const user = await this.usersService.create({ username, password });

    const { password: _password, ...result } = user;
    return result;
  }
}
