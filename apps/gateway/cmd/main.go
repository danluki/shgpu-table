package main

import (
	"github.com/danilluk1/shgpu-table/libs/grpc/clients"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	app.Use(cors.New())

	// parserGrpcClient := clients.NewParser()
	adminGrpcClient := clients.NewAdmin()

	v1 := app.Group("/v1")
}
