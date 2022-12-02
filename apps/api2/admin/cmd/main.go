package main

import (
	"fmt"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"

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

	err = gormDB.AutoMigrate(&models.Admin{})

	if err != nil {
		logger.Fatal("Can't do migrations")
	}

	adminsRepository := admin.NewRepository(gormDB)
	
}
