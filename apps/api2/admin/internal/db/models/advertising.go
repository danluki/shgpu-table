package models

import (
	"time"

	"github.com/lib/pq"
)

type Advertising struct {
	Id uint `gorm:"primaryKey;autoIncrement"`
	Faculties pq.Int32Array `gorm:"type:integer[]"`
	AdminId uint
	Admin Admin `gorm:"notnull"`
	Text string `gorm:"type:varchar;notnull"`
	TotalCount uint `gorm:"notnull"`
	SendDate time.Time
}