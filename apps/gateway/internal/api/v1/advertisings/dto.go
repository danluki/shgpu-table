package advertisings

type AddAdvertsingDto struct {
	Text       string   `json:"text"       validate:"required"`
	Faculties  []uint32 `json:"faculties"  validate:"required"`
	TotalCount uint8    `json:"totalCount" validate:"required"`
	SendDate   string   `json:"sendDate"   validate:"required"`
}
