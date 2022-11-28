package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	admin "github.com/danilluk1/shgpu-table/apps/api2/admin/pkg"
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
		log.Fatal()
	}

	//Maybe change pacakge to admin
	adminRepository := admins.NewRepository(gormDB)
	admin.NewAdminService(adminRepository)
	var svc admin.Service
	adminServer := admin.NewHttpServer(svc)

	http.ListenAndServe(":8080", adminServer)
	fmt.Println("Admin has been started successfully 😊.")
}
