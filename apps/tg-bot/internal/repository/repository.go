package repository

import (
	// "context"

	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

// func (c *Repository) GetTelegarmSubscirbers(ctx context.Context) ([]*models.TgUsers, error) {
// 	var tgUsers []models.TgUsers
// 	err := c.db.WithContext(ctx).Find(&tgUsers).Error
// 	if err != nil {
// 		return nil, err
// 	}

// 	return tgUsers, nil
// }

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}
