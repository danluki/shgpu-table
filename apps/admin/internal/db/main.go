package db

import (
	"fmt"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/config"
	gormpg "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func New(host, user, password, dbName string, port uint) (*gorm.DB, error) {
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%d/%s?sslmode=disable",
		user,
		password,
		host,
		port,
		dbName,
	)

	return gorm.Open(gormpg.Open(connStr), nil)
}

func NewByConfig(c config.PostgresConfig) (*gorm.DB, error) {
	return New(c.Host, c.User, c.Pass, c.DbName, c.Port)
}
