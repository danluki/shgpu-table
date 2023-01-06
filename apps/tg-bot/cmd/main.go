package main

import (
	"log"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/api"
	config "github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/samber/do"
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
	cfg, err := config.New()
	if err != nil {
		log.Panic(err)
	}
	do.ProvideValue(di.Provider, *cfg)

	db, err := db.New(cfg.DbConn)
	if err != nil {
		log.Panic(err)
	}
	do.ProvideValue(di.Provider, *db)

	processedNotifyMessages := make(chan parser.ProcessedMessage, 1)
	do.ProvideValue(di.Provider, processedNotifyMessages)

	bot, err := tgbotapi.NewBotAPI(cfg.TelegramKey)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true
	log.Printf("Bot has been started on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	var api api.Pairs
	api.Init()
	// if err != nil {
	// 	/*
	// 		Here, we need to get all subscibers from database, end send them a message,
	// 		that our notify system is broken
	// 	*/
	// 	log.Panic(err)
	// }

	go notifyHandler()

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
				}
			}

			log.Printf("[%s] %s", update.Message.From.UserName, update.Message.Text)

			bot.Send(msg)
		}
	}
}

func notifyHandler() {
	processedMessages := do.MustInvoke[chan parser.ProcessedMessage](di.Provider)
	/*
		Here, we need to get all subscibers from database, end send them a message,
		that our notify system is broken
	*/
	log.Println("Waiting")
	message := <-processedMessages
	log.Println(message)
}
