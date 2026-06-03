import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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
