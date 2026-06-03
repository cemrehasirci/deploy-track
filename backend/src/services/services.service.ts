import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const service = await this.prisma.service.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    if (!service) {
      throw new NotFoundException('Service bulunamadı.');
    }

    return service;
  }

  async create(data: CreateServiceDto) {
    const existingService = await this.prisma.service.findUnique({
      where: {
        name: data.name,
      },
    });

    if (existingService) {
      throw new BadRequestException('Bu service adı zaten kullanılıyor.');
    }

    return this.prisma.service.create({
      data,
    });
  }

  async update(id: number, data: UpdateServiceDto) {
    await this.findOne(id);

    if (data.name) {
      const existingService = await this.prisma.service.findUnique({
        where: {
          name: data.name,
        },
      });

      if (existingService && existingService.id !== id) {
        throw new BadRequestException('Bu service adı zaten kullanılıyor.');
      }
    }

    return this.prisma.service.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
