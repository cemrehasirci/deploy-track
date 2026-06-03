# Deploy Track

Deploy Track is a backend-focused platform for tracking service deployments across multiple environments.

Built with NestJS, PostgreSQL, Prisma and JWT-based authentication.

---

## Current Features
- JWT authentication
- Role-based authorization (```ADMIN``` / ```OPERATOR``` / ```VIEWER```)
- Protected API endpoints with guards
- User management
- Password hashing with bcrypt
- Environment-based configuration support
- PostgreSQL integration with Prisma ORM
- Dockerized PostgreSQL setup

## Planned Features
- Service management
- Environment management
- Deployment history tracking
- Rollback relationships
- Audit logs
- Swagger documentation

## Tech Stack
- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Docker

---

# Run Project

Install dependencies:
``` npm install ```

Start PostgreSQL:
``` docker compose up -d ```

Run migrations:
``` npx prisma migrate dev ```

Seed database:
``` npx ts-node prisma/seed.ts ```

Start backend:
``` npm run start:dev ```