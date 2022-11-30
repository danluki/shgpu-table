package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"

	// "github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	// admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"
	// "github.com/go-kit/log"
	"go.uber.org/zap"
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
	gormDB.AutoMigrate(&models.Admin{})

	if err != nil {
		// log.
	}

	grpcServer := admin.NewGRPCServer(endpoints.)
	grpcListener, err := 

	// var logger2 log.Logger
	// logger2 = log.NewLogfmtLogger(os.Stderr)
	// logger2 = log.With(logger2, "listen", "8081", "caller", log.DefaultCaller)

	// //Maybe change pacakge to admin
	// adminRepository := admins.NewRepository(gormDB)
	// svc := admin.NewLoggingMiddleware(logger2, admin.NewAdminService(adminRepository))
	// adminServer := admin.NewHttpServer(svc)
	// http.ListenAndServe(":8080", adminServer)
	fmt.Println("Admin has been started successfully 😊.")
}
