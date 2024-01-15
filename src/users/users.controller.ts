import { Controller, Get } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.userservice.getAll();
  }
}
