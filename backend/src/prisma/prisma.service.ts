// DB'ye bağlantı ayarlarının olduğu yer

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    if (!connectionString) {
      throw new Error('DATABASE_URL tanımlı değil.');
    }

    // DB'ye bağlantı havuzu
    const pool = new Pool({
      connectionString,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });

    this.pool = pool;
  }

  // uyg başlarken DB connect
  async onModuleInit() {
    await this.$connect();
  }

  // uyg kapanırken DB disconnect
  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
