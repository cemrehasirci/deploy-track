import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, DeploymentStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL tanımlı değil.');
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// test amaçlı veriler
async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {
      passwordHash: hashedPassword,
      role: Role.ADMIN,
      fullName: 'Admin User',
    },
    create: {
      fullName: 'Admin User',
      email: 'admin@test.com',
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const service = await prisma.service.upsert({
    where: { name: 'payment-service' },
    update: {},
    create: {
      name: 'payment-service',
      description: 'Handles payments',
    },
  });

  const env = await prisma.environment.upsert({
    where: { name: 'prod' },
    update: {},
    create: {
      name: 'prod',
      clusterName: 'minikube',
      namespace: 'default',
    },
  });

  await prisma.deployment.create({
    data: {
      serviceId: service.id,
      environmentId: env.id,
      deployedByUserId: admin.id,
      version: '1.0.0',
      imageTag: 'payment-service:1.0.0',
      status: DeploymentStatus.SUCCESS,
    },
  });
}

main()
  .then(() => console.log('Seed tamam'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
