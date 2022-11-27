package admin

import (
	"context"
	"crypto/bcrypt"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
	"github.com/go-kit/kit/log"
	"golang.org/x/crypto/bcrypt"
)

type adminService struct{}

func NewAdminService() Service { return &adminService{} }

func (admin *adminService) Create(_ context.Context, name, pass string) (dtos.AdminDto, error) {
	bcrypt.GenerateFromPassword([]byte(pass), 10)
}
