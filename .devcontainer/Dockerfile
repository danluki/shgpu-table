FROM archlinux:base-20221127.0.105785

ARG NODE_VERSION="18.12.1"
ARG GO_VERSION="2:1.19.3"

ARG USERNAME=shgpu-table
ARG USER_UID=1000
ARG USER_GID=$USER_UID
RUN groupadd --gid $USER_GID $USERNAME && \
    useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

RUN pacman -Sy --noconfirm gcc git nodejs=$NODE_VERSION go=$GO_VERSION npm protobuf=21.10-1 && npm i -g @go-task/cli

RUN echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers

RUN echo "${USERNAME}:shgpu-table" | chpasswd
USER ${USERNAME}
ENV PATH="$PATH:/home/$USERNAME/go/bin"
RUN SHELL=/bin/bash

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2 && \
    go install github.com/mitranim/gow@latest && \
    go install mvdan.cc/gofumpt@latest && \
    go install github.com/segmentio/golines@latest && \
    go install -v golang.org/x/tools/gopls@latest


