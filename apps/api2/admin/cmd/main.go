package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"time"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	grpc_impl "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/grpc_impl"
	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	//clients "github.com/danilluk1/shgpu-table/libs/grpc/clients"
	adminGen "github.com/danilluk1/shgpu-table/libs/grpc/generated"
	//servers "github.com/danilluk1/shgpu-table/libs/grpc/servers"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/keepalive"
)

func main() {
	fmt.Println("HOST -", config.GetHost())
	fmt.Println("PORT -", config.GetPort())
	fmt.Println("USER -", config.GetUser())
	fmt.Println("PASS -", config.GetPass())
	fmt.Println("DBNAME -", config.GetDbName())
	fmt.Println("ENV -", config.GetEnv())

	var logger *zap.Logger

	if config.GetEnv() == "development" {
		l, _ := zap.NewDevelopment()
		logger = l
	} else {
		l, _ := zap.NewProduction()
		logger = l
	}

	gormDB, err := db.NewByConfig(config.GetPostgresConfig())

	if err != nil {
		logger.Fatal("Can't connect to database")
	}

	err = gormDB.AutoMigrate(&models.Admin{})

	if err != nil {
		logger.Fatal("Can't do migrations")
	}

	adminsRepository := admin.NewRepository(gormDB)
	//adminGrpcClient := clients.NewAdmin()

	lis, err := net.Listen("tcp", "localhost:50051")

	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer(grpc.KeepaliveParams(keepalive.ServerParameters{
		MaxConnectionAge: 1 * time.Minute,
	}))
	adminGen.RegisterAdminServer(grpcServer, grpc_impl.NewServer(&grpc_impl.GrpcImplOpts{
		Repository: *adminsRepository,
	}))

	go grpcServer.Serve(lis)

	fmt.Println("Admin has been started successfully 😊.")

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c
	log.Fatalf("Exiting")
	grpcServer.Stop()
}
