FROM node:18-alpine as build

WORKDIR /usr/src/app/rest

COPY ./apps/rest/package*.json ./
COPY ./apps/rest/tsconfig*.json ./
COPY ./apps/rest/ .

RUN npm install
RUN npm run build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/rest
COPY ./apps/rest/package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/rest/dist ./dist

CMD ["node", "dist/main.js"]