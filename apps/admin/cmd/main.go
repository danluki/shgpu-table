package main

import (
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/daemon"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/di"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/samber/do"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"log"
	"net"
	"os"
	"os/signal"
	"time"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	grpc_impl "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/grpc_impl"
	"github.com/danilluk1/shgpu-table/libs/config"

	adminGen "github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"

	"google.golang.org/grpc"
	"google.golang.org/grpc/keepalive"
)

func main() {
	cfg, err := config.New()
	if err != nil || cfg == nil {
		panic(err)
	}
	do.ProvideValue[config.Config](di.Provider, *cfg)

	var logger *zap.Logger

	if cfg.AppEnv == "development" {
		l, _ := zap.NewDevelopment()
		logger = l
	} else {
		l, _ := zap.NewProduction()
		logger = l
	}
	do.ProvideValue[zap.Logger](di.Provider, *logger)

	gormDB, err := db.NewByStr(cfg.AdminPostgresUrl)
	if err != nil {
		panic(err)
	}
	do.ProvideValue[gorm.DB](di.Provider, *gormDB)

	err = gormDB.AutoMigrate(&models.Admin{}, &models.Advertising{})
	if err != nil {
		panic(err)
	}

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	if err != nil {
		panic(err)
	}
	grpcServer := grpc.NewServer(grpc.KeepaliveParams(keepalive.ServerParameters{
		MaxConnectionAge: 1 * time.Minute,
	}))
	adminGen.RegisterAdminServer(grpcServer, grpc_impl.NewServer())

	ps, err := pubsub.NewPubSub(cfg.RedisUrl)
	if err != nil {
		panic(err)
	}

	dm := daemon.New(gormDB, ps)
	go dm.Start()

	go grpcServer.Serve(lis)

	logger.Info("Admin service has been started successfully.")

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c
	log.Fatalf("Exiting")
	grpcServer.Stop()
}
