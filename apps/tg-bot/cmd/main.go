package main

import (
	"fmt"
	"log"
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/bot"
	config "github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/db"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/repository"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/sse"
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
	go tableBot.StartHandling(uc, botAnswers)
	//Must be changed to be a real async
	//maybe notifyMessages := make(chan string, 15)
	//maybe up for 3-5 code strings
	notifyMessages := make(chan string)
	go sse.Subscribe(fmt.Sprintf("%s/v1/pairs/notify", cfg.ApiUrl), notifyMessages)

	select {
	case <-notifyMessages:
		{
			msg, err := parser.ParseMessage(<-notifyMessages, time.Now())
			log.Println(msg) //TODO Parser it is goroutine, so this is always nil
			if err != nil {
				log.Println(err)
			}
		}
	case <-botAnswers:
		{
			tableBot.SendMessage(<-botAnswers)
		}

	}
	// rm, err := parser.ParseMessage(<-notifyMessages, time.Now())
	// if err != nil {
	// 	panic("Invalid message in notify sse")
	// }

	// bot, err := tgbotapi.NewBotAPI(cfg.TelegramKey)
	// if err != nil {
	// 	log.Panic(err)
	// }

	// bot.Debug = true
	// log.Printf("Bot has been started on accont %s", bot.Self.UserName)

	// var api api.Pairs
	// api.Init()
	// if err != nil {
	//
	// 	log.Panic(err)
	// }

	// go notifyHandler()

	// updates := bot.GetUpdatesChan(u)
	// for update := range updates {
	// 	if update.Message != nil {

	// 		var msg tgbotapi.MessageConfig
	// 		msg.ChatID = update.Message.Chat.ID
	// 		msg.Text = "Добро пожаловать в неофициального бота расписания ШГПУ"
	// 		if update.Message.IsCommand() {
	// 			switch update.Message.Command() {
	// 			case "start":
	// 				msg.ReplyMarkup = kb
	// 			}
	// 		}

	// 		log.Printf("[%s] %s", update.Message.From.UserName, update.Message.Text)

	// 		bot.Send(msg)
	// 	}
	// }
}

func notifyHandler() {
	processedMessages := do.MustInvoke[chan parser.ResultMessage](di.Provider)
	/*
		Here, we need to get all subscibers from database, end send them a message,
		that our notify system is broken
	*/
	log.Println("Waiting")
	message := <-processedMessages
	log.Println(message)
}
