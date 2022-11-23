FROM node:alpine as development 

WORKDIR /usr/src/apps/api

COPY ./apps/api/package*.json ./
COPY ./apps/api/tsconfig*.json ./

RUN npm install

COPY ./apps/api/ ./

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/apps/api

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/apps/api/dist ./dist

CMD ["node", "dist/apps/orders/main"]

