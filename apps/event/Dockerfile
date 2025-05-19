# 어떤 이미지를 사용할 것인가?
FROM node:18-alpine AS development

WORKDIR /usr/src/app

#package.json 복사하기
COPY package*.json ./

# Dependency 설치하기
RUN npm install

#파일/폴더 복사하기
COPY . .

#커멘드 실행
CMD ["npm", "start:dev", "event"]