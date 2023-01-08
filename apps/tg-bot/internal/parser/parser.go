package parser

import "time"

type ProcessedMessage struct {
	FacultyId uint8     `json:"facultyId"`
	Link      string    `json:"link"`
	WeekBegin time.Time `json:"weekBegin"`
	WeekEnd   time.Time `json:"weekEnd"`
	IsNew     bool      `json:"isNew"`
	IsUpdated bool      `json:"isUpdated"`
}

func ProcessMessage(msg string) (string, error) {

}
