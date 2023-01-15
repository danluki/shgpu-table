package repository

import (
	// "context"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db/models"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func (r *Repository) AddNewSubscriber(chatId int64, groupName string, facultyId uint8) error {
	sub := models.TgUser{
		ChatId:    uint(chatId),
		GroupName: groupName,
		FacultyId: uint(facultyId),
	}
	err := r.db.Create(&sub).Error
	if err != nil {
		return err
	}

	return nil
}

func (r *Repository) RemoveSubscriber(chatId int64) error {
	err := r.db.Delete(&models.TgUser{}, "chat_id = ?", chatId).Error
	if err != nil {
		return err
	}
	return nil
}

func (c *Repository) GetTelegarmSubscribers(faculty uint8) (*[]models.TgUser, error) {
	var tgUsers []models.TgUser
	err := c.db.Find(&tgUsers).Error
	if err != nil {
		return nil, err
	}

	return &tgUsers, nil
}

func (c *Repository) GetSubscriberByChatId(id int64) (*models.TgUser, error) {
	var sub models.TgUser
	err := c.db.Find(&sub).Where("chat_id = ?", id).Error
	if err != nil {
		return nil, err
	}

	if sub.ChatId == 0 && sub.FacultyId == 0 && sub.GroupName == "" {
		return nil, nil
	}

	return &sub, nil
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}
