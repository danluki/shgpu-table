package admins

import (
	"time"
)

type adminDto struct {
	Name         string `validate:"required" json:"name"`
	Id           uint32 `validate:"required" json:"id"`
	RefreshToken string `validate:"required" json:"refresh_token"`
	AccessToken  string `validate:"required" json:"access_token"`
}

type loginDto struct {
	Login string `validate:"required" json:"login"`
	Pass  string `validate:"required" json:"pass"`
}

type refreshResponseDto struct {
	RefreshToken string `validate:"required" json:"refresh_token"`
	AccessToken  string `validate:"required" json:"access_token"`
}

type advertsingDto struct {
	Id         uint      `json:"id"`
	Faculties  []uint32  `json:"faculties"`
	AdminId    uint      `json:"adminId"`
	Text       string    `json:"text"`
	TotalCount uint      `json:"totalCount"`
	SendDate   time.Time `json:"sendDate"`
}
