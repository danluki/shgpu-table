package api

import (
	"github.com/r3labs/sse/v2"
)

type Api struct {
	client *sse.Client
}

func (*Api) Init() {
	client := sse.NewClient("")
}
