# 🚀 reward-event

**reward-event**는 사용자 이벤트 및 보상 관리를 위한 Node.js 기반 API 서버입니다.

## 📋 목차

- [실행 방법](#실행-방법)
- [api document](#api-document)
    - [이벤트 api](#이벤트-api)
    - [인증 api](#인증-api)
- [프로젝트 구조](#프로젝트-구조)

## ⚙️ 실행 방법

#### 1. 저장소를 클론합니다.
    ```
    git clone <your-repo-url>
    cd reward-event
    ```
#### 2. 각 서비스 폴더에 `.env` 파일을 생성합니다.

__환경 변수 설정__

__*apps/event/.env*__
  ```
  SALT_ROUND=10
  PAGE_NUM=10
  IN_DAYS=86400000 // 3일이내 로그인 완료한 사람에게 조건 보상
  DB_URL="mongodb://mongo:mongo@mongo_user:27017"
  ```

__*apps/gateway/.env*__
  ```
  HTTP_PORT=3000
  JWT_SECRET='secret'
  ```

__*apps/user/.env*__
  ```
  JWT_SECRET='secret'
  PAGE_NUM=10
  SALT_ROUND=10
  HTTP_PORT=3000
  DB_URL="mongodb://mongo:mongo@mongo_user:27017"
  ```

#### 3. Docker Compose로 실행합니다.
    ```
    docker compose up --build
    ```


## 📝 api document

### 🎉 이벤트 api


| 메서드 | 경로 | 설명 | 권한 |
| :----: | :------------------------------------------: | :----------------------------: | :-------------------------: |
|  GET   | /events                                    | 모든 이벤트 조회                | all                        |
|  GET   | /events/:eventId                           | 특정 이벤트 조회                | all                        |
|  GET   | /events/:eventId/rewards                   | 특정 이벤트 보상 조회           | all                        |
|  POST  | /events                                    | 이벤트 생성 (admin)             | admin, operator            |
| PATCH  | /events/:eventId/status                    | 이벤트 상태 변경 (admin)        | admin, operator            |
|  POST  | /events/:eventId/add/rewards               | 보상 추가 (admin)               | admin                      |
|  GET   | /events/users/me/claims                    | 내 보상 조회                    | user, admin                |
|  POST  | /events/:eventId/claim                     | 이벤트 보상 받기                | user                       |
|  GET   | /events/admin/rewards/claims               | 전체 보상 조회                  | admin, operator, auditor   |


### 🔐 인증 api

| 메서드 | 경로 | 설명 | 권한 |
| :----: | :------------------------------------------: | :----------------------------: | :-------------------------: |
|  POST  | /auth/login                                 | 사용자 로그인                   |                            |
|  POST  | /auth/register                              | 사용자 회원가입                 |                            |
| PATCH  | /auth/users/:userId/role                    | 사용자 역할 수정                | admin                      |

---

## 📁 프로젝트 구조
```
reward-event/
├── apps/
│ ├── common/
│ ├── event/
│ ├── gateway/
│ └── user/
├── docker-compose.yml
└── README.md
```

## ⚙️ 아키텍처

```
+--------+      HTTP Request       +-------------+       TCP        +-------------+       Mongo       +-------------+
| client |  ---------------------> |   Gateway   | ---------------> |   auth      | <---------------> | auth-db     |
|        | <---------------------  |             | <--------------- |             |                   +-------------+
+--------+       HTTP Response     +-------------+                  +-------------+
                                      ^    |
                                      |    | TCP
                                      |    v
                                 +-------------+       Mongo       +-------------+
                                 |   event     | <---------------> | event-db    |
                                 +-------------+                   +-------------+

```
>>>>>>> 3aeca8f39f566abf30659deb5ff92fb2fbd168ec
