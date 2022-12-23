package pairs

type PairsQueryDto struct {
	Instructor string `json:"instructor"`
	GroupName  string `json:"groupName"  validate:"required"`
	DaysCount  uint32 `json:"daysCount"`
	DaysOffset uint32 `json:"daysOffset"`
	BeginDate  string `json:"beginDate"`
	EndDate    string `json:"endDate"`
}
