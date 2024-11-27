FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN apk --no-cache add curl

USER node

EXPOSE  8000-8007 
EXPOSE 5555

CMD pnpm install && pnpm -r --workspace-concurrency=7 dev