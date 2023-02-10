package main

import (
	apiv1 "github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/advertisings"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/pairs"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/config"
	"github.com/danilluk1/shgpu-table/libs/grpc/clients"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"go.uber.org/zap"
	"log"
	"reflect"
	"strings"
)

func main() {
	cfg, err := config.New()
	if err != nil || cfg == nil {
		panic(err)
	}

	zlogger, _ := zap.NewDevelopment()

	validatorInstance := validator.New()
	validatorInstance.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}

		return name
	})
	errorMiddleware := middlewares.ErrorHandler(zlogger)

	app := fiber.New(fiber.Config{
		ErrorHandler: errorMiddleware,
	})
	app.Use(cors.New(
		cors.Config{
			AllowCredentials: true,
			AllowOrigins:     "*",
		},
	))
	app.Use(logger.New())

	adminGrpcClient := clients.NewAdmin(cfg.AppEnv)
	parserGrpcClient := clients.NewParserClient(cfg.AppEnv)

	v1 := app.Group("/v1")

	pb, err := pubsub.NewPubSub(cfg.RedisUrl)
	if err != nil {
		zlogger.Fatal("Can't connect to PubSub")
	}

	services := types.Services{
		Validator:    validatorInstance,
		Logger:       zlogger,
		ParserClient: parserGrpcClient,
		AdminClient:  adminGrpcClient,
		PubSub:       pb,
		Events:       make(chan string),
		Advertisings: make(chan string),
	}
	apiv1.Setup(v1, services)

	pb.Subscribe("advertisings", func(data string) {
		advertisings.OnNewAdvertising(services, data)
	})

	//TODO: Need only one of this three
	pb.Subscribe("tables.test", func(data string) {
		pairs.OnNewTableCB(services, data)
	})

	pb.Subscribe("tables.new", func(data string) {
		pairs.OnNewTableCB(services, data)
	})
	pb.Subscribe("tables.update", func(data string) {
		pairs.OnNewTableCB(services, data)
	})

	app.Use(func(c *fiber.Ctx) error {
		return c.Status(404).SendString("Not found")
	})

	log.Fatal(app.Listen(":3002"))
}
