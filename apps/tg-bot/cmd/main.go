package main

import (
	"log"

	config "github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/samber/do"
	gorm "gorm.io/gorm"
)

var kb = tgbotapi.NewReplyKeyboard(
	tgbotapi.NewKeyboardButtonRow(
		tgbotapi.NewKeyboardButton("Пары на неделю"),
		tgbotapi.NewKeyboardButton("Пары на след неделю"),
	),
	tgbotapi.NewKeyboardButtonRow(
		tgbotapi.NewKeyboardButton("Пары завтра"),
		tgbotapi.NewKeyboardButton("Пары сегодня"),
	),
	tgbotapi.NewKeyboardButtonRow(
		tgbotapi.NewKeyboardButton("⌚️ Звонки"),
		tgbotapi.NewKeyboardButton("💾 Скачать"),
		tgbotapi.NewKeyboardButton("🆘 Помощь"),
	),
)

func main() {
	di := do.New()

	cfg, err := config.New()
	if err != nil {
		log.Panic(err)
	}
	do.ProvideValue[config.AppConfig](di, *cfg)

	db, err := db.New(cfg.DbConn)
	if err != nil {
		log.Panic(err)
	}
	do.ProvideValue[gorm.DB](di, *db)

	bot, err := tgbotapi.NewBotAPI(cfg.TelegramKey)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true
	log.Printf("Bot has been started on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)
	for update := range updates {
		if update.Message != nil {

			var msg tgbotapi.MessageConfig
			msg.ChatID = update.Message.Chat.ID
			msg.Text = "Добро пожаловать в неофициального бота расписания ШГПУ"
			if update.Message.IsCommand() {
				switch update.Message.Command() {
				case "start":
					msg.ReplyMarkup = kb
					log.Println("??")
				}
			}

			log.Printf("[%s] %s", update.Message.From.UserName, update.Message.Text)

			bot.Send(msg)
		}
	}
}
