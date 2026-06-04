import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';

@Injectable()
export class EnvironmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.environment.findMany({
      // sadece aktif olan env
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const environment = await this.prisma.environment.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!environment) {
      throw new NotFoundException('Environment bulunamadı.');
    }

    return environment;
  }

  async create(data: CreateEnvironmentDto) {
    const existingEnvironment = await this.prisma.environment.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingEnvironment) {
      throw new BadRequestException('Bu environment adı zaten kullanılıyor.');
    }

    return this.prisma.environment.create({
      data,
    });
  }

  async update(id: number, data: UpdateEnvironmentDto) {
    await this.findOne(id);

    if (data.name) {
      const existingEnvironment = await this.prisma.environment.findUnique({
        where: {
          name: data.name,
        },
      });

      if (existingEnvironment && existingEnvironment.id !== id) {
        throw new BadRequestException('Bu environment adı zaten kullanılıyor.');
      }
    }

    return this.prisma.environment.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.environment.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
