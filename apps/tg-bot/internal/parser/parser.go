package parser

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/go-playground/validator/v10"
)

type ParsedMessage struct {
	FacultyId uint8     `json:"facultyId" validate:"required"`
	Link      string    `json:"link"      validate:"required"`
	WeekBegin time.Time `json:"weekBegin" validate:"required"`
	WeekEnd   time.Time `json:"weekEnd"   validate:"required"`
	IsNew     bool      `json:"isNew"`
	IsUpdated bool      `json:"isUpdated"`
}

type ResultMessage struct {
	Faculty uint8
	Message string
}

func ParseMessage(msg string, curTime time.Time) (*ResultMessage, error) {
	var pm ParsedMessage
	err := json.Unmarshal([]byte(msg), &pm)
	if err != nil {
		return nil, err
	}
	//TODO: Validator must be global object to enalble caching
	err = validator.New().Struct(pm)
	if err != nil {
		return nil, err
	}
	if err != nil {
		return nil, err
	}
	if (pm.IsNew && pm.IsUpdated) || (!pm.IsNew && !pm.IsUpdated) {
		return nil, errors.New("table must be created OR updated")
	}

	rm := &ResultMessage{
		Faculty: 0,
		Message: "",
	}
	if pm.IsNew {
		if curTime.After(pm.WeekBegin) && curTime.Before(pm.WeekEnd) {
			rm.Message = fmt.Sprintf(
				"Появилось расписание на текущую неделю, вы можете получить расписание по ссылке %s или введя команду: пары на неделю",
				pm.Link,
			)
		} else if curTime.Before(pm.WeekBegin) {
			rm.Message = fmt.Sprintf(
				"Появилось расписание на следущую неделю, вы можете получить расписание по ссылке %s или введя команду: пары на след неделю",
				pm.Link,
			)
		}
	}

	if pm.IsUpdated {
		if curTime.After(pm.WeekBegin) && curTime.Before(pm.WeekEnd) {
			rm.Message = fmt.Sprintf(
				"Обновилось расписание на текущую неделю, вы можете получить расписание по ссылке %s или введя команду: пары на неделю",
				pm.Link,
			)
		} else if curTime.Before(pm.WeekBegin) {
			rm.Message = fmt.Sprintf(
				"Обновилось расписание на следущую неделю, вы можете получить расписание по ссылке %s или введя команду: пары на след неделю",
				pm.Link,
			)
		}
	}

	return rm, nil
}
