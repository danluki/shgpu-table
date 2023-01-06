package dtos

type TableMessage struct {
	FacultyId  uint8  `json:"faculty_id"`
	TableLink  string `json:"table_link"`
	WeekBegin  string `json:"week_begin"`
	WeekEnd    string `json:"week_end"`
	IsNew      bool   `json:"is_new"`
	IsModified bool   `json:"is_modified"`
}
