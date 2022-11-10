FROM node:18-alpine as production_build

WORKDIR /usr/src/app

COPY ./apps/parser/package*.json ./parser/
COPY ./apps/parser/tsconfig*.json ./parser/
COPY ./apps/parser/src ./parser/src

RUN ls -a

WORKDIR /usr/src/app/parser

RUN npm install
RUN npm run build

FROM node:18-alpine as production_run
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/parser/dist .

CMD ["node", "dist/index"] 
