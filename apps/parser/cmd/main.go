package main

import (
	"fmt"

	"github.com/danilluk1/shgpu-table/apps/parser/internal/config"
	watcher "github.com/danilluk1/shgpu-table/apps/parser/internal/watchers"
)

func main() {
	fmt.Println("REDIS_URL -", config.GetRedisUrl())
	watcher.ParsePages()
}
