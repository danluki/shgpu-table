package models

import "time"

type Advertising struct {
	Id uint `gorm:"primaryKey;autoIncrement"`
	FacultyId uint
	AdminId uint
	Admin Admin `gorm:"notnull"`
	Text string `gorm:"type:varchar;notnull"`
	TotalCount uint `gorm:"notnull"`
	SendDate time.Time
}