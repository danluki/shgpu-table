package admin

import (
	"context"
	"log"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/repositories/admins"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
	"golang.org/x/crypto/bcrypt"
)

type service struct {
	repository admins.Repository
}

func NewAdminService(repo admins.Repository) *service {
	return &service{
		repository: repo,
	}
}

func (admin *service) Create(ctx context.Context, name, pass string) (*dtos.AdminDto, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(pass), 10)
	if err != nil {
		log.Fatal("Someting bad happened in bcrypt")
	}

	dbAdmin, err := admin.repository.AddNew(ctx, string(hash), name)
	if err != nil {
		return nil, err
	}

	token, err := jwt.CreateToken(dbAdmin.Id)
	if err != nil {
		log.Fatal("Can't create token for admin")
	}

	dbAdmin, err = admin.repository.SetRefreshToken(ctx, dbAdmin.Id, *token)

	if err != nil {
    return nil, err
  }
}
