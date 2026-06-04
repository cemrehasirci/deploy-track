import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type AuthenticatedUser = {
  userId: number;
  email: string;
  role: string;
  isSystemAdmin: boolean;
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly userSelect = {
    id: true,
    fullName: true,
    email: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  };

  async findAll() {
    return this.prisma.user.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        id: 'asc',
      },
      select: this.userSelect,
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
      select: this.userSelect,
    });

    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Bu email zaten kullanımda.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        passwordHash: hashedPassword,
        role: data.role,
      },
      select: this.userSelect,
    });
  }

  async update(
    id: number,
    data: UpdateUserDto,
    currentUser: AuthenticatedUser,
  ) {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    const isProtectedAdmin = targetUser.isSystemAdmin;
    const isCurrentUserSystemAdmin = currentUser.isSystemAdmin;

    if (isProtectedAdmin && !isCurrentUserSystemAdmin) {
      throw new ForbiddenException('System admin kullanıcısı değiştirilemez.');
    }

    if (!targetUser.isActive && !isCurrentUserSystemAdmin) {
      throw new ForbiddenException(
        'Pasif kullanıcıları sadece System admin güncelleyebilir.',
      );
    }

    if (isProtectedAdmin) {
      if (data.role && data.role !== 'ADMIN') {
        throw new ForbiddenException('System admin rolü değiştirilemez.');
      }

      if (data.isActive === false) {
        throw new ForbiddenException('System admin pasif hale getirilemez.');
      }
    }

    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException('Bu email zaten kullanımda.');
      }
    }

    const updateData: Prisma.UserUpdateInput = {};

    if (data.fullName !== undefined) {
      updateData.fullName = data.fullName;
    }

    if (data.email !== undefined) {
      updateData.email = data.email;
    }

    if (data.role !== undefined) {
      updateData.role = data.role;
    }

    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
    }

    if (data.password !== undefined) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateData,
      select: this.userSelect,
    });
  }

  async remove(id: number, currentUser: AuthenticatedUser) {
    const targetUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('Kullanıcı bulunamadı.');
    }

    const isProtectedAdmin = targetUser.isSystemAdmin;
    const isCurrentUserSystemAdmin = currentUser.isSystemAdmin;

    if (isProtectedAdmin) {
      throw new ForbiddenException('System admin kullanıcısı silinemez.');
    }

    if (!targetUser.isActive && !isCurrentUserSystemAdmin) {
      throw new ForbiddenException(
        'Pasif kullanıcıları sadece ana admin silebilir.',
      );
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
      select: this.userSelect,
    });
  }
}
