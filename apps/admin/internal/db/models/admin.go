package models

type Admin struct {
	Id           uint   `gorm:"primaryKey;autoIncrement"`
	Name         string `gorm:"type:varchar(30);unique;notnull"`
	Password     string `gorm:"type:varchar"`
	RefreshToken string `gorm:"type:varchar"`
}
