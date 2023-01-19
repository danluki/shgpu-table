FROM node:18-alpine as rest_build
WORKDIR /usr/src/app/rest
COPY ./apps/rest/package*.json ./
COPY ./apps/rest/tsconfig*.json ./
COPY ./apps/rest/ .

FROM node:18-alpine as rest
WORKDIR /usr/src/app/rest
COPY ./apps/rest/package*.json ./
COPY ./apps/rest/tsconfig*.json ./
COPY ./apps/rest/ .
WORKDIR /usr/src/app/rest
RUN npm install
RUN npm run build
CMD ["node", "dist/main.js"]



FROM node:18-alpine as parser_build
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
RUN npm install
RUN npm run build

FROM node:18-alpine as parser
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
COPY ./apps/parser/tsconfig*.json ./
COPY ./apps/parser/src ./src
CMD ["node", "--experimental-specifier-resolution=node", "dist/index.js"]
