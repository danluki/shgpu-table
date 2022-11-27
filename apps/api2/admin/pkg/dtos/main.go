package dtos

type CreateDto struct {
	Name string `json:"name"`
	Pass string `json:"pass"`
}

type AdminDto struct {
	Name         string `json:"name"`
	Pass         string `json:"pass"`
	RefreshToken string `json:"refresh_token"`
	AccessToken  string `json:"access_token"`
	Id           uint   `json:"id"`
}