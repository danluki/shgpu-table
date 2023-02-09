FROM node:19-alpine as base

COPY --from=golang:1.19.5-alpine /usr/local/go/ /usr/local/go/
ENV PATH="$PATH:/usr/local/go/bin"
ENV PATH="$PATH:/root/go/bin"

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN apk add --no-cache protoc git curl libc6-compat protobuf protobuf-dev

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
  go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

WORKDIR /app
RUN npm i -g pnpm@7

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json turbo.json go.work go.work.sum ./

COPY libs libs
COPY apps apps
COPY frontend frontend

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:19-alpine as node_prod_base
RUN npm i -g pnpm

FROM node:19-alpine as node_deps_base
WORKDIR /app
RUN npm i -g pnpm
RUN apk add git
COPY --from=base /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/turbo.json ./

FROM node_deps_base as watcher_deps
RUN apk add openssh libc6-compat
COPY --from=base /app/apps/watcher apps/watcher/
COPY --from=base /app/libs/pubsub libs/pubsub/
COPY --from=base /app/libs/shared libs/shared/
COPY --from=base /app/libs/grpc libs/grpc/
RUN pnpm install --prod --frozen-lockfile

FROM node_prod_base as watcher
WORKDIR /app
COPY --from=watcher_deps /app/ /app/
CMD ["pnpm", "--filter=@shgpu-table/watcher", "start"]

FROM node_deps_base as parser_deps
RUN apk add openssh libc6-compat
COPY --from=base /app/apps/parser apps/parser/
COPY --from=base /app/libs/pubsub libs/pubsub/
COPY --from=base /app/libs/shared libs/shared/
COPY --from=base /app/libs/grpc libs/grpc/
COPY --from=base /app/libs/typeorm libs/typeorm/
RUN pnpm install --prod --frozen-lockfile

FROM node_prod_base as parser
WORKDIR /app
COPY --from=parser_deps /app/ /app/
CMD ["pnpm", "--filter=@shgpu-table/parser", "start"]