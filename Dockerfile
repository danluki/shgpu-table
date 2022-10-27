FROM library/postgres

COPY ./parser/src/db/queries/* /docker/entrypoint-initdb.d/

# FROM node:18-alpine

# WORKDIR /app/parser/
# COPY ./parser/package*.json ./
# COPY ./parser/.env ./

# RUN npm install

# COPY ./parser .

# FROM base as production
# # ENV NODE_PATH=./build
# RUN npm run build


