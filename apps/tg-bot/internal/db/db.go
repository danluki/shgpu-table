package db

import (
	gormpg "gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func New(connStr string) (*gorm.DB, error) {
	return gorm.Open(gormpg.Open(connStr), nil)
}
