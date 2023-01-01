package advertisings

import "time"

type AddAdvertsingDto struct {
	Text       string   `json:"text"       validate:"required"`
	Faculties  []uint32 `json:"faculties"  validate:"required"`
	TotalCount uint8    `json:"totalCount" validate:"required"`
	SendDate   string   `json:"sendDate"   validate:"required"`
}

type advertsingDto struct {
	Id         uint      `json:"id"`
	Faculties  []int32   `json:"faculties"`
	AdminId    uint      `json:"adminId"`
	Text       string    `json:"text"`
	TotalCount uint      `json:"totalCount"`
	SendDate   time.Time `json:"sendDate"`
}
