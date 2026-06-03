// prismaService'i NestJS için tanımlıyor

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  // bunu kullanabilir
  providers: [PrismaService],
  // bunu paylaşabilir
  exports: [PrismaService],
})
export class PrismaModule {}
