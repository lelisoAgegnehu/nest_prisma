import { Injectable } from '@nestjs/common';
export type User = { userId: number; username: string; password: string };

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((users) => users.username === username);
  }
  async getAll(): Promise<User[]> {
    return this.users;
  }
}
