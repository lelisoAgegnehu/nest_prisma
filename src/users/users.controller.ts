import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.userservice.users({
      where: {
        deletedAt: null,
      },
    });
  }
}
