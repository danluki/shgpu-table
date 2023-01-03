package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"reflect"
	"strings"
	"syscall"

	apiv1 "github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/pairs"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/config"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/clients"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/contrib/fiberzap"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewDevelopment()

	// sentry.Init(sentry.ClientOptions{
	// 	Dsn:              config.GetSentryDsn(),
	// 	Debug:            true,
	// 	TracesSampleRate: 1.0,
	// })
	validator := validator.New()
	validator.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}

		return name
	})
	errorMiddleware := middlewares.ErrorHandler(logger)

	app := fiber.New(fiber.Config{
		ErrorHandler: errorMiddleware,
	})
	app.Use(cors.New(
		cors.Config{
			AllowCredentials: true,
			AllowOrigins:     "http://localhost:3000",
		},
	))

	appLogger, _ := zap.NewDevelopment()
	app.Use(fiberzap.New(fiberzap.Config{
		Logger: appLogger,
	}))

	adminGrpcClient := clients.NewAdmin()
	parserGrpcClient := clients.NewParserClient()

	v1 := app.Group("/v1")

	pb, err := pubsub.NewPubSub(config.GetRedisUrl())
	if err != nil {
		logger.Fatal("Can't connect to PubSub")
	}

	services := types.Services{
		Validator:    validator,
		Logger:       logger,
		ParserClient: parserGrpcClient,
		AdminClient:  adminGrpcClient,
		PubSub:       pb,
		Events:       make(chan string),
	}
	apiv1.Setup(v1, services)
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

	exitSignal := make(chan os.Signal, 1)
	signal.Notify(exitSignal, syscall.SIGINT, syscall.SIGTERM)
	<-exitSignal
	fmt.Println("Closing...")
}
