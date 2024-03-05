FROM node:lts-alpine as dev

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build 


FROM node:20-alpine AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/package*.json .

COPY --from=build /app/client/ ./client

RUN npm ci --only=production

EXPOSE 5000

CMD ["npm", "run", "start:prod"]