package models

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Id           uint   `gorm:"type:primaryKey;autoIncrement`
	Name         string `gorm:"type:varchar(30);unique"`
	Password     string `gorm:"type:varchar"`
	RefreshToken string `gorm:"type:varchar"`
}
