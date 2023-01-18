package dtos

type TableMessage struct {
	FacultyId  uint8  `json:"faculty_id"`
	TableLink  string `json:"table_link"`
	WeekBegin  string `json:"week_begin"`
	WeekEnd    string `json:"week_end"`
	IsNew      bool   `json:"is_new"`
	IsModified bool   `json:"is_modified"`
}

type FacultyDto struct {
	Name string `json:"name"`
	Id   uint8  `json:"id"`
}

type PairDto struct {
	Name   string `json:"name"`
	Number uint8  `json:"number"`
	Day    uint8  `json:"day"`
	Group  string `json:"groupName"`
	Date   string `json:"date"`
}

type PairsResponse struct {
	Faculty FacultyDto
	Pairs   []PairDto
}
