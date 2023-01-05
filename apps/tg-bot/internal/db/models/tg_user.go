package models

type TgUser struct {
	ChatId    uint   `gorm:"primaryKey"`
	GroupName string `gorm:"type:varchar(50);unique;notnull"`
	FacultyId uint   `gorm:""`
}
