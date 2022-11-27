package db

import (

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

func New(user, password, dbName string, port uint) (*gorm.DB, error) {
	
}

func NewByConfig(*gorm.DB, error) {
	c := config
}
