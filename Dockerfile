FROM node:19-alpine as base

COPY --from=golang:1.19.5-alpine /usr/local/go/ /user/local/go/
ENV PATH="$PATH:/usr/local/go/bin"
ENV PATH="$PATH:/root/go/bin"

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN apk add --no-cache protoc git curl libc6-compat

WORKDIR /app
RUN npm i -g pnpm@7

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json turbo.json .npmrc go.work go.work.sum ./

COPY libs libs
COPY apps apps
COPY frontend frontend

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:19-alpine as node_prod_base
