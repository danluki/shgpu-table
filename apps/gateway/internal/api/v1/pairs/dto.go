package pairs

type PairsQueryDto struct {
	GroupName  string `validate:"required" json:"groupName"`
	DaysCount  uint32 `                    json:"daysCount"`
	DaysOffset uint32 `                    json:"daysOffset"`
	BeginDate  string `                    json:"beginDate"`
	EndDate    string `                    json:"endDate"`
}
