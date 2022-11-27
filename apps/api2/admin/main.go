package main

import (
	"fmt"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
)

func main() {
	fmt.Println("HOST -", config.GetHost())
	fmt.Println("PORT -", config.GetPort())
	fmt.Println("USER -", config.GetUser())
	fmt.Println("PASS -", config.GetPass())
	fmt.Println("DBNAME -", config.GetDbName())
	fmt.Println("ENV -", config.GetEnv())

	

	fmt.Println("Admin has been started successfully 😊.")
}
