FROM node:18-alpine as build
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
COPY ./apps/parser/tsconfig*.json ./
COPY ./apps/parser/src ./src
RUN npm install
RUN npm run build


FROM node:18-alpine as production
WORKDIR /usr/src/app/parser
COPY ./apps/parser/package*.json ./
COPY --from=build /usr/src/app/parser/dist ./dist
RUN npm install --only=production
CMD ["node", "--experimental-specifier-resolution=node", "dist/index.js"]

