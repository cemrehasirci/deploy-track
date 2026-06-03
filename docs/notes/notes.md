# DB
npx prisma migrate dev
npx ts-node prisma/seed.ts

# Çalıştır
npx run start:dev

# Docker
docker exec -it deploy-track-postgres psql -U postgres -d deploytrack
\dt
>  Schema |        Name        | Type  |  Owner   
--------+--------------------+-------+----------
 public | AuditLog           | table | postgres
 public | Deployment         | table | postgres
 public | Environment        | table | postgres
 public | Service            | table | postgres
 public | User               | table | postgres
 public | _prisma_migrations | table | postgres

select id, email, role, "passwordHash" from "User";
> id |     email     |  role  |   passwordHash                         
----+----------------+--------+---------------------
  2 | hash@test.com  | VIEWER | $2b$10$JKwpKrMy
  1 | admin@test.com | ADMIN  | $2b$10$nuTniHyV

# Auth
npx nest g module auth
npx nest g service auth
npx nest g controller auth

