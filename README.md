<<<<<<< HEAD
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
=======
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
