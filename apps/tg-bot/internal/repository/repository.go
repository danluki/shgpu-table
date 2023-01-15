package repository

import (
	// "context"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db/models"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (c *Repository) GetTelegarmSubscirbers(faculty uint8) (*[]models.TgUser, error) {
	var tgUsers []models.TgUser
	err := c.db.Find(&tgUsers).Error
	if err != nil {
		return nil, err
	}

	return &tgUsers, nil
}

func (c *Repository) GetSubByChatId(id int64) (*models.TgUser, error) {
	var sub models.TgUser
	err := c.db.Find(&sub).Where("chat_id = ?", id).Error
	if err != nil {
		return nil, err
	}

	return &sub, nil
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}
