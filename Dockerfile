FROM node:19-alpine as base

COPY --from=golang:1.20-alpine /usr/local/go/ /usr/local/go/
ENV PATH="$PATH:/usr/local/go/bin"
ENV PATH="$PATH:/root/go/bin"

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN apk add --no-cache protoc git curl libc6-compat protobuf protobuf-dev

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
  go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

WORKDIR /app
RUN npm i -g pnpm@7

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json turbo.json go.work go.work.sum docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
COPY libs libs
COPY apps apps
COPY frontend frontend

RUN pnpm install --no-frozen-lockfile
RUN pnpm build

FROM node:19-alpine as node_prod_base
RUN npm i -g pnpm
RUN apk add wget tzdata
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub
RUN echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories
RUN apk add doppler
RUN rm -rf /var/cache/apk/*

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
COPY --from=base /app/libs/config libs/config/
COPY --from=base /app/libs/grpc libs/grpc/
RUN pnpm install --prod --no-frozen-lockfile

FROM node_prod_base as watcher
WORKDIR /app
COPY --from=watcher_deps /app/ /app/
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["pnpm", "--filter=@shgpu-table/watcher", "start"]

FROM node_deps_base as parser_deps
RUN apk add openssh libc6-compat
COPY --from=base /app/apps/parser apps/parser/
COPY --from=base /app/libs/pubsub libs/pubsub/
COPY --from=base /app/libs/shared libs/shared/
COPY --from=base /app/libs/grpc libs/grpc/
COPY --from=base /app/libs/config libs/config/
COPY --from=base /app/libs/typeorm libs/typeorm/
RUN pnpm install --prod --nosfrozen-lockfile

FROM node_prod_base as parser
WORKDIR /app
COPY --from=parser_deps /app/ /app/
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["pnpm", "--filter=@shgpu-table/parser", "start"]

FROM node_deps_base as migrations_deps
COPY --from=base /app/tsconfig.json /app/tsconfig.base.json ./
COPY --from=base /app/libs/typeorm libs/typeorm/
RUN pnpm install --prod --frozen-lockfile

FROM node_prod_base as migrations
WORKDIR /app
COPY --from=migrations_deps /app/ /app/
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["pnpm", "run", "migrate:deploy"]

FROM alpine:latest as go_prod_base
RUN apk add wget tzdata && \
  wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
  echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
  apk add doppler && apk del wget && \
  rm -rf /var/cache/apk/*

FROM golang:1.20-alpine as golang_deps_base
WORKDIR /app
RUN apk add git curl wget upx tzdata
COPY --from=base /app/apps/admin apps/admin/
COPY --from=base /app/apps/gateway apps/gateway/
COPY --from=base /app/apps/tg-bot apps/tg-bot/
COPY --from=base /app/apps/watcher apps/watcher/
COPY --from=base /app/apps/parser apps/parser/
COPY --from=base /app/libs/pubsub libs/pubsub/
COPY --from=base /app/libs/shared libs/shared/
COPY --from=base /app/libs/config libs/config/
COPY --from=base /app/libs/grpc libs/grpc/
COPY --from=base /app/libs/typeorm libs/typeorm/
RUN rm -r `find . -name node_modules -type d`

FROM golang_deps_base as gateway_deps
RUN cd apps/gateway && go mod download
RUN cd apps/gateway && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ./out ./cmd/main.go && upx -9 -k ./out


FROM go_prod_base as gateway
COPY --from=gateway_deps /app/apps/gateway/out /bin/gateway
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["/bin/gateway"]

FROM golang_deps_base as admin_deps
RUN cd apps/admin && go mod download
RUN cd apps/admin && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ./out ./cmd/main.go && upx -9 -k ./out


FROM go_prod_base as admin
COPY --from=admin_deps /app/apps/admin/out /bin/admin
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["/bin/admin"]

FROM golang_deps_base as tg-bot_deps
RUN cd apps/tg-bot && go mod download
RUN cd apps/tg-bot && CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o ./out ./cmd/main.go && upx -9 -k ./out

FROM go_prod_base as tg-bot
COPY --from=tg-bot_deps /app/apps/tg-bot/out /bin/tg-bot
COPY --from=base /app/docker-entrypoint.sh /app/
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["/bin/tg-bot"]
