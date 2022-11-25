export GOBIN=$PWD/devbox/go
export GOTOOLDIR=$PWD/devbox/go
export GOPATH=$PWD/.devbox/nix/profile
export PATH=$PATH:$GOPATH/bin:$GOBIN:GOTOOLDIR

which gow || go install github.com/mitranim/gow@latest
which gofumpt || go install mvdan.cc/gofumpt@latest
which golines || go install github.com/segmentio/golines@latest

which nodemon || npm i -g nodemon