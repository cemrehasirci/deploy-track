import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentsService } from './environments.service';

@Controller('environments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Roles(Role.ADMIN, Role.OPERATOR, Role.VIEWER)
  @Get()
  async findAll() {
    return this.environmentsService.findAll();
  }

  @Roles(Role.ADMIN, Role.OPERATOR, Role.VIEWER)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.environmentsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.OPERATOR)
  @Post()
  async create(@Body() body: CreateEnvironmentDto) {
    return this.environmentsService.create(body);
  }

  @Roles(Role.ADMIN, Role.OPERATOR)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEnvironmentDto,
  ) {
    return this.environmentsService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.environmentsService.remove(id);
  }
}
