package main

import (
	"fmt"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
)

func main() {
	fmt.Println("HOST -", config.GetHost())
	fmt.Println("PORT -", config.GetPort())
	fmt.Println("USER -", config.GetUser())
	fmt.Println("PASS -", config.GetPass())
	fmt.Println("DBNAME -", config.GetDbName())
	fmt.Println("ENV -", config.GetEnv())

	gormDB, err := db.NewByConfig(config.GetPostgresConfig())

	if err != nil {
		log.Fatal()
	}

	gormDB.AutoMigrate(&models.Admin{})

	if err != nil {
		log.Fatal()
	}

	fmt.Println("Admin has been started successfully 😊.")
}
