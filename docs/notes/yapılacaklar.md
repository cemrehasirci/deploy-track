# YAPILACAKLAR
## 1. JWT koruması
JwtAuthGuard oluşturacağız
GET /users endpointini token zorunlu hale getireceğiz
Postman’de Bearer Token ile test edeceğiz

## 2. Role-based access
Roller:
- ADMIN
- OPERATOR
- VIEWER


Bizim role branch ne zaman bitecek?

Şunlar bitince:

JWT guard ✔️
Roles decorator
RolesGuard
ADMIN restriction
role testleri



### Yapılacaklar:
Roles decorator
RolesGuard
bazı endpointleri sadece admin yapma

Örnek:
user oluşturma → ADMIN
user listeleme → ADMIN
deployment listeleme → ADMIN / OPERATOR / VIEWER

## 3. Service management
Endpointler:
POST /services
GET /services
GET /services/:id
PATCH /services/:id

Bu, sistemde takip edilecek uygulama servislerini yönetecek.

Örnek:
payment-service
auth-service
notification-service


## 4. Environment management
Endpointler:
POST /environments
GET /environments
GET /environments/:id
PATCH /environments/:id

Örnek environment:
dev
staging
prod


## 5. Deployment history tracking
Endpointler:
POST /deployments
GET /deployments
GET /deployments/:id

Filtreler:
serviceId
environmentId
status
deployedBy
tarih aralığı


## 6. Rollback relationships

Deployment içinde zaten schema’da altyapısı var.

Yapılacak:
rollback deployment oluşturma
eski deployment ile bağlantı kurma
rollback geçmişini gösterme


## 7. Audit logs
Kim ne yaptı tutulacak.

Örnek:
user oluşturdu
service ekledi
deployment kaydı oluşturdu


## 8. Swagger
API dokümantasyonu.

Bu proje için çok iyi durur:
endpointler görünür
request body’ler görünür
auth token ile test edilebilir


## 9. Dockerize backend
Şu an sadece PostgreSQL Docker’da.

Sonra:
backend için Dockerfile
docker-compose içine backend ekleme


## 10. Minikube
En son:
backend image build
Kubernetes Deployment
Service
ConfigMap
Secret
Ingress