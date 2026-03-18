import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Body, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(
    @Body() body: { fullName: string; email: string; password: string },
  ) {
    return this.usersService.create(body);
  }
}
