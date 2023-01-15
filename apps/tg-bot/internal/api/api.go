package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/jinzhu/now"
	"github.com/samber/do"
)

type GroupDto struct {
	GroupName   string `json:"groupName"   validate:"required"`
	FacultyId   uint8  `json:"facultyId"   validate:"required"`
	FacultyName string `json:"facultyName" validate:"required"`
}

func FindGroupByName(group string) (*GroupDto, error) {
	cfg := do.MustInvoke[config.AppConfig](di.Provider)
	resp, err := http.Get(
		fmt.Sprintf(
			"%s/v1/groups/%s",
			cfg.ApiUrl,
			group,
		),
	)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == 404 {
		return nil, nil
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var groupDto GroupDto
	err = json.Unmarshal([]byte(body), &groupDto)
	if err != nil {
		return nil, err
	}
	return &groupDto, nil
}

// TODO: Return message in human readable format
func FindPairsForWeek(group string, isCurrent bool) {
	cfg := do.MustInvoke[config.AppConfig](di.Provider)
	var (
		beginDate time.Time
		endDate   time.Time
	)
	if isCurrent {
		beginDate = now.BeginningOfWeek()
		endDate = now.EndOfWeek()
	} else {
		beginDate = now.With(time.Now().AddDate(0, 0, 7)).BeginningOfWeek()
		endDate = now.With(time.Now().AddDate(0, 0, 7)).EndOfWeek()
	}
	resp, err := http.Get(
		fmt.Sprintf(
			"%s/v1/pairs?groupName=%s&beginDate=%s&endDate=%s",
			cfg.ApiUrl,
			group,
			beginDate.UTC().Format("2006-01-02"),
			endDate.UTC().Format("2006-01-02"),
		),
	)
	if err != nil {
		panic(err)
	}
	_, err = io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
}
