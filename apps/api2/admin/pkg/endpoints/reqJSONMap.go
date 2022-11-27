package endpoints

import (
	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
)
type CreateRequest struct {
	Name string `json:"name"`
	Pass string `json:"pass"`
}

type CreateResponse struct {
	Name         string `json:"name"`
	Pass         string `json:"pass"`
	RefreshToken string `json:"refresh_token"`
	AccessToken  string `json:"access_token"`
	Id           uint   `json:"id"`
	Err          string `json:"err"`
}

type LoginRequest struct {
}

type UpdateRequest struct {
}

type ValidateAdmin struct {
}
