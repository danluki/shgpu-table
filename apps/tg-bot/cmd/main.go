package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/bot"
	config "github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db/models"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/repository"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/ws"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/jinzhu/now"
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
	err = db.AutoMigrate(&models.TgUser{})
	if err != nil {
		log.Fatal(err)
	}
	repo := repository.NewRepository(db)
	do.ProvideValue(di.Provider, *repo)

	now.WeekStartDay = time.Monday

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
	// tableBot.FindPairsForWeek("230Б", true)
	botAnswers := make(chan tgbotapi.MessageConfig, 20)
	defer close(botAnswers)
	go tableBot.StartHandling(uc, botAnswers)

	notifyMessages := make(chan string, 15)
	defer close(notifyMessages)
	go ws.Listen(fmt.Sprintf("%s/v1/pairs/notify", cfg.ApiUrlWs), notifyMessages)

	var exitSignal = make(chan os.Signal)
	for {
		select {
		case message := <-notifyMessages:
			{
				msg, err := parser.ParseMessage(message, time.Now())
				if msg == nil {
					continue
				}
				if err != nil {
					log.Println(err)
				}
				tableBot.BroadcastNotifyMessage(*msg)
			}
		case answer := <-botAnswers:
			{
				tableBot.SendMessage(answer)
			}
		case <-exitSignal:
			{
				signal.Notify(exitSignal, syscall.SIGINT, syscall.SIGTERM)
			}
		}
	}
}
