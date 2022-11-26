package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Id           uint   `gorm:"type:primaryKey;autoIncrement`
	Name     string `gorm:"type:varchar(30);unique"`
	Password     string `gorm:"type:varchar"`
	RefreshToken string `gorm:"type:varchar"`
}

func Init(user, password, dbName string, port uint) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.New(postgres.New(postgres.Config{
		DSN:                   fmt.Sprintf("user=%s password=%s dbname=%s port=%d", user, password, dbName, port),
	})))

	return db, err
}
