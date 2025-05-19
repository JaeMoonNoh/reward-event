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
#### 4. 회원가입

- 첫 아이디는 admin으로 지정하고, 이후에는 role을 제외하고 회원가입 할 수 있습니다.
    - /auth/sign-up
    - /aut/login
- admin은 다른 아이디의 role을 변경할 수 있습니다.
    - /auth/users/:userId/role 

```
sign-up
{
    "userId": "testid",
    "name": "메이플스토리",
    "password": "password",
    "role": "admin"
}

login
{
    "userId":"testid",
    "password":"password"
}
```

#### 5. 이벤트 추가

- 초기 상태는 inactive 상태이기 때문에 상태를 변경해야 합니다. 
    - /events/:eventId/status

```
{
  "title": "이벤트 테스트",
  "startDate": "2025-05-18T00:00:00.000Z",
  "endDate": "2025-06-20T23:59:59.000Z",
  "conditions": {
    "daysSinceSignUp": 3
  },
  "rewards" : [{
    "type" : "coupon",
    "value" : 5000
  }]
}

inactive -> active 변경

{
    "status":"active"
}
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


![image](https://github.com/user-attachments/assets/2bca432b-6017-4106-8e8d-8086200e42ba)

## 조건이라는 것에 대해서

apps/event/src/event/strategy

해당 루트에서 코드를 보실 수 있습니다.

- 조건이 여러가지 생길 수 있습니다.
	- 이를 위해 Strategy Pattern을 고민했습니다.
	
- 하나라도 조건에 부합하지 않으면 보상은 없습니다.
	- 조건별 개별 결과를 수집/판단할 수 있습니다.
	
- 유연하게 조건을 추가할 수 있어야 합니다.
	- Factory Pattern + DI 기반을 구성했습니다.
	- 신규 Strategy를 생성하고, strategy Map에 추가합니다.

조건이 많아질 수 있는 상황에서 각 조건을 객체화하고, 유연하게 전략을 조립할 수 있도록 Strategy + Factory 패턴을 적용했습니다.
이 구조는 조건이 하나라도 실패하면 전체 실패로 간주하는 비즈니스 로직을 깔끔하게 표현할 수 있습니다.
새로운 조건 추가시 기존 코드 변경 없이 확장 또한 가능합니다. 
이벤트의 보상이 사내에서 회의후 달라질 수도 있고 조건이 추가될 수 있는 상황을 가정했습니다.
