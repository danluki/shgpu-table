package parser

import "time"

type ProcessedMessage struct {
	FacultyId  uint8
	TableLink  string
	WeekBegin  time.Time
	WeekEnd    time.Time
	IsNew      bool
	IsModified bool
}
