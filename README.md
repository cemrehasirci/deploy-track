# Deploy Track

Deploy Track is a backend-focused platform for tracking application services and their deployment lifecycle across multiple environments.

The project is built with NestJS, PostgreSQL, Prisma, JWT authentication, and role-based authorization.

---

## Current Features

- JWT-based authentication
- Role-based authorization with `ADMIN`, `OPERATOR`, and `VIEWER`
- Protected API endpoints with guards
- User management
- Password hashing with bcrypt
- Environment-based configuration
- PostgreSQL integration with Prisma ORM
- Dockerized PostgreSQL setup
- Service Management module
- Environment Management module
- DTO-based request validation
- Soft delete support for services and environments

---

## Service Management

The Service Management module is used to define deployable application services.

A service can represent an API, backend application, worker, frontend application, or any deployable software component.

### Service Fields

| Field | Description |
|---|---|
| `name` | Service name |
| `description` | Optional service description |
| `repoUrl` | Optional repository URL |
| `ownerTeam` | Optional responsible team |
| `isActive` | Used for soft delete |

### Service Endpoints

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/services` | `ADMIN`, `OPERATOR`, `VIEWER` | List active services |
| `GET` | `/services/:id` | `ADMIN`, `OPERATOR`, `VIEWER` | Get service detail |
| `POST` | `/services` | `ADMIN`, `OPERATOR` | Create a new service |
| `PATCH` | `/services/:id` | `ADMIN`, `OPERATOR` | Update a service |
| `DELETE` | `/services/:id` | `ADMIN` | Soft delete a service |

### Example Service Request

```json
{
  "name": "order-api",
  "description": "Order management backend service",
  "repoUrl": "https://github.com/cemrehasirci/order-api",
  "ownerTeam": "backend-team"
}
```

Service deletion is handled as soft delete by setting `isActive` to `false`. This keeps future deployment history records safe.

---

## Environment Management

The Environment Management module is used to define deployment environments such as development, staging, and production.

An environment can represent a Kubernetes namespace, cluster target, or application runtime environment.

### Environment Fields

| Field | Description |
|---|---|
| `name` | Environment name |
| `clusterName` | Optional cluster name |
| `namespace` | Optional Kubernetes namespace |
| `baseUrl` | Optional environment base URL |
| `description` | Optional environment description |
| `isActive` | Used for soft delete |

### Environment Endpoints

| Method | Endpoint | Roles | Description |
|---|---|---|---|
| `GET` | `/environments` | `ADMIN`, `OPERATOR`, `VIEWER` | List active environments |
| `GET` | `/environments/:id` | `ADMIN`, `OPERATOR`, `VIEWER` | Get environment detail |
| `POST` | `/environments` | `ADMIN`, `OPERATOR` | Create a new environment |
| `PATCH` | `/environments/:id` | `ADMIN`, `OPERATOR` | Update an environment |
| `DELETE` | `/environments/:id` | `ADMIN` | Soft delete an environment |

### Example Environment Request

```json
{
  "name": "staging",
  "clusterName": "aks-staging-cluster",
  "namespace": "deploy-track-staging",
  "baseUrl": "https://staging.example.com",
  "description": "Staging environment"
}
```

Environment deletion is handled as soft delete by setting `isActive` to `false`. This keeps future deployment history records safe.

---

## Roles

| Role | Description |
|---|---|
| `ADMIN` | Can manage users and has full access to service and environment management |
| `OPERATOR` | Can view, create, and update services/environments, but cannot delete them or manage users |
| `VIEWER` | Can only view allowed resources |

---

## Planned Features

- User management improvements
- Deployment history tracking
- Deployment status management
- Rollback relationships
- Audit logs
- Swagger documentation
- Dockerized backend service
- CI pipeline with GitHub Actions

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

## Project Structure

```txt
deploy-track/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── auth/
│       ├── environments/
│       ├── prisma/
│       ├── services/
│       └── users/
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Run Project

Start PostgreSQL from the project root:

```bash
docker compose up -d
```

Install backend dependencies:

```bash
cd backend
npm install
```

Run Prisma migration:

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

---

## Environment Variables

Root `.env.example`:

```env
POSTGRES_DB=deploy_track
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
```

Backend `.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/deploy_track?schema=public"

JWT_SECRET="change_this_secret"
JWT_EXPIRES_IN="1d"

PORT=3000
```