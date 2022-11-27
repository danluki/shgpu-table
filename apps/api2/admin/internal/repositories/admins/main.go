package admins

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

func (r *Repository) SetRefreshToken(ctx context.Context, adminId uint, token jwt.JwtToken) (*models.Admin, error) {
	var admin models.Admin
	err := r.db.WithContext(ctx).Model(&admin).Where("id =?", adminId).Updates(map[string]interface{}{
		"refresh_token": token.RefreshToken,
	}).Error
	
	if err != nil {
    return nil, err
  }

	return &admin, nil
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}
