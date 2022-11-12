FROM node:18-alpine as build
WORKDIR /usr/src/app/telegram-bot
COPY ./apps/telegram-bot/package*.json ./
COPY ./apps/telegram-bot/tsconfig*.json ./
COPY ./apps/telegram-bot/src ./src
RUN npm install
RUN npm run build


FROM node:18-alpine as production
WORKDIR /usr/src/app/telegram-bot
COPY ./apps/telegram-bot/package*.json ./
COPY --from=build /usr/src/app/telegram-bot/dist ./dist
RUN npm install --only=production
CMD ["node", "--experimental-specifier-resolution=node", "dist/index.js"]

