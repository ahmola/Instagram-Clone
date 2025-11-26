# Instagram-Clone
Instagram Clone with Microservice Architecture

## Workflow

### 0. 서비스 설계, (요구사항 분석)

---

### 1. 데이터 모델링, ERD 초안

![img](ERD.png)

---

### 2. API 명세

    https://www.notion.so/Instagram-Clone-API-2b02b42602558028a96ad8f99a7fa4ec?source=copy_link

---

### 3. 아키텍처 디자인

![img](architecture.png)

---

### 4. 스키마 구체화

#### 4-1. 물리 스키마(DDL, MySQL)

##### 4-1-1. Init

ERD에 따라 DB, 테이블 생성(IF NOT EXISTS)

##### 4-1-2. Indexes

자주 사용될 것으로 예상되는 쿼리문에 대한 인덱스 설계

#### 4-2. 애플리케이션 스키마
    
#### 4-2-1. JPA Entity (Domain Model)

User Service
- **User**
    - id : Long
    - username: String
    - passwordHash: String
    - bio: String
    - avatarUrl: String
    - createdAt: LocalDateTime
---
Post Service
- **Post**
    - id: Long
    - userId: FK(User)
    - caption: String
    - createdAt: LocalDateTime
- **PostImage**
    - id: Long
    - 
---
Comment Service

---
Follow Service

---
Like Service

---
#### 4-2-2. Request/Response DTO

---
#### 4-2-3. Repository Interface

---
#### 4-2-4. Service Layer (Business Logic)

---
#### 4-2-5. Controller Layer (API Mapping)

---
#### 4-2-6. Exception / ApiResponse Specification

---
#### 4-2-7. Kafka Event

---
#### 4-2-8. gRPC Protocol

---
#### 4-2-9. Grafana Log Query

---
#### 4-2-10. Grafana PromQuery

---
#### 4-2-11. (Potential) Cache Entity / Mapper / Validation / Authentication

---
### 5. DB 마이그레이션

schema.sql, data.sql, indexes.sql 파일 작성

---

### 6. 코드 작성(Test Driven Development)

#### 6-1. Unit Test

#### 6-2. Integration Test

#### 6-3. API Mock

---

### 7. CI/CD

Github Actions에서 CI/CD 파이프라인 수행

---

#### 7-1. Push

코드를 Github에 Push

#### 7-2. Build

서비스 앱과 도커 이미지 빌드

#### 7-3. Docker Compose, Shell Script

Docker Compose 작성

#### 7-4. Deploy
    
AWS EC2 혹은 네이버 클라우드 활용 예정

---

### 8. 피드백

#### 8-1. Grafana K6를 활용한 Load Test

#### 8-2. [4-2]의 (Potential)파트 도입 여부 결정