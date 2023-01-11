package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/bot"
	config "github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/repository"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/ws"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/samber/do"
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
	repo := repository.NewRepository(db)
	do.ProvideValue(di.Provider, *repo)

	botapi, err := tgbotapi.NewBotAPI(cfg.TelegramKey)
	if cfg.AppEnv == "development" {
		botapi.Debug = true
	}
	if err != nil {
		log.Panic(err)
	}
	uc := tgbotapi.NewUpdate(0)
	uc.Timeout = 60
	tableBot := bot.New(botapi)
	botAnswers := make(chan tgbotapi.MessageConfig)
	defer close(botAnswers)
	go tableBot.StartHandling(uc, botAnswers)

	//maybe notifyMessages := make(chan string, 15)
	notifyMessages := make(chan string)
	defer close(notifyMessages)
	go ws.Listen(fmt.Sprintf("%s/v1/pairs/notify", cfg.ApiUrlWs), notifyMessages)

	// parsedMessages := make(chan parser.ResultMessage, 15)
	var exitSignal = make(chan os.Signal)
	select {
	case <-notifyMessages:
		{
			log.Println(<-notifyMessages)
			msg, err := parser.ParseMessage(<-notifyMessages, time.Now())
			if err != nil {
				log.Println(err)
			}
			tableBot.BroadcastNotifyMessage(*msg)
		}
	case <-botAnswers:
		{
			tableBot.SendMessage(<-botAnswers)
		}
	}
	<-exitSignal
}
