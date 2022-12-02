package admin

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/internal/jwt"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) AddNew(ctx context.Context, hash, name string) (*models.Admin, error) {
	admin := &models.Admin{
		Name:     name,
		Password: hash,
	}

	if err := r.db.WithContext(ctx).Create(admin).Error; err != nil {
		return nil, err
	}

	return admin, nil
}

func (r *Repository) SetRefreshToken(ctx context.Context, adminId uint, token jwt.JwtToken) (error) {
	var admin models.Admin
	err := r.db.WithContext(ctx).Model(&admin).Where("id =?", adminId).Update("refresh_token", token.RefreshToken.Token).Error
	
	if err != nil {
    return err
  }

	return nil
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}
