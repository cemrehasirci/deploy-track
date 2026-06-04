# Deploy Track

Deploy Track is a backend-focused platform for managing application services, deployment environments, and deployment lifecycle records.

The project is built with NestJS, PostgreSQL, Prisma, JWT authentication, and role-based authorization.

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Docker

---

## Modules

### Authentication

- JWT-based login
- Protected routes with `JwtAuthGuard`
- Role-based access control with `ADMIN`, `OPERATOR`, and `VIEWER`
- Inactive users cannot log in

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Login and receive access token |
| `GET` | `/auth/me` | Get authenticated user profile |

---

### User Management

User management supports user creation, listing, updating, soft delete, and inactive user handling.

System admin protection is included through the `isSystemAdmin` flag. Only one system admin can exist, and this user is created through seed data.

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/users` | `ADMIN`, `OPERATOR` | List active users |
| `GET` | `/users/inactive` | System Admin only | List inactive users |
| `GET` | `/users/:id` | `ADMIN`, `OPERATOR` | Get user detail |
| `POST` | `/users` | `ADMIN` | Create a new user |
| `PATCH` | `/users/:id` | `ADMIN` | Update user information |
| `DELETE` | `/users/:id` | `ADMIN` | Soft delete a user |

User deletion is handled as soft delete by setting `isActive` to `false`.

System admin rules:

- System admin is created only by seed data.
- API requests cannot create or update `isSystemAdmin`.
- Only one system admin can exist.
- System admin cannot be deleted or deactivated.
- Only system admin can manage inactive users.

---

### Service Management

Service management is used to define deployable application services such as APIs, workers, frontend applications, or backend services.

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/services` | `ADMIN`, `OPERATOR`, `VIEWER` | List active services |
| `GET` | `/services/:id` | `ADMIN`, `OPERATOR`, `VIEWER` | Get service detail |
| `POST` | `/services` | `ADMIN`, `OPERATOR` | Create a new service |
| `PATCH` | `/services/:id` | `ADMIN`, `OPERATOR` | Update a service |
| `DELETE` | `/services/:id` | `ADMIN` | Soft delete a service |

Service deletion is handled as soft delete by setting `isActive` to `false`.

---

### Environment Management

Environment management is used to define deployment environments such as development, staging, and production.

An environment can represent a Kubernetes namespace, cluster target, or application runtime environment.

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/environments` | `ADMIN`, `OPERATOR`, `VIEWER` | List active environments |
| `GET` | `/environments/:id` | `ADMIN`, `OPERATOR`, `VIEWER` | Get environment detail |
| `POST` | `/environments` | `ADMIN`, `OPERATOR` | Create a new environment |
| `PATCH` | `/environments/:id` | `ADMIN`, `OPERATOR` | Update an environment |
| `DELETE` | `/environments/:id` | `ADMIN` | Soft delete an environment |

Environment deletion is handled as soft delete by setting `isActive` to `false`.

---

## Roles

| Role | Description |
|---|---|
| `ADMIN` | Can manage users and has full access to service/environment operations |
| `OPERATOR` | Can view users, create/update services and environments, but cannot delete them |
| `VIEWER` | Can only view allowed service and environment resources |

---

## Run Project

Start PostgreSQL:

```bash
docker compose up -d
```

Install backend dependencies:

```bash
cd backend
npm install
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed database:

```bash
npx ts-node prisma/seed.ts
```

Start backend:

```bash
npm run start:dev
```

The backend runs on:

```txt
http://localhost:3000
```

Environment variables are documented in `.env.example` files.

---

## Planned Features

- Deployment history tracking
- Deployment status management
- Rollback relationships
- Audit logs
- Swagger documentation
- Dockerized backend service
- CI pipeline with GitHub Actions