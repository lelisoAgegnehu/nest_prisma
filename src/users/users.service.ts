import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll(): string {
    return 'get all users';
  }
}
