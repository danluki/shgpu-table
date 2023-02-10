package db

import (
	"fmt"
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

func NewByStr(connStr string) (*gorm.DB, error) {
	return gorm.Open(gormpg.Open(connStr), nil)
}
