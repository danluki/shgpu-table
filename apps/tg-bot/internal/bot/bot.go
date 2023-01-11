package bot

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"regexp"
	"time"

	// "regexp"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/config"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/repository"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/jinzhu/now"
	"github.com/samber/do"
)

type TableBot struct {
	TgApi   *tgbotapi.BotAPI
	updates tgbotapi.UpdatesChannel
}

type FacultyDto struct {
	Name string `json:"name"`
	Id   uint8  `id:"id"`
}

type PairDto struct {
}

type pairsResponse struct {
	Faculty FacultyDto
	Pairs   []PairDto
}

// func (bot TableBot) ProcessMessage(msg tgbotapi.Message) (string, error) {
// 	if msg.IsCommand() {
// 		bot.processCommandMessage(msg)
// 	} else {
// 		bot.processDefaultMessage(msg)
// 	}

//		return "", nil
//	}
func (bot TableBot) FindPairsForWeek(group string, isCurrent bool) {
	cfg := do.MustInvoke[config.AppConfig](di.Provider)
	var (
		beginDate time.Time
		endDate   time.Time
	)
	if isCurrent {
		beginDate = now.BeginningOfWeek()
		endDate = now.EndOfWeek()
	} else {
		beginDate = now.With(time.Now().AddDate(0, 0, 7)).BeginningOfWeek()
		endDate = now.With(time.Now().AddDate(0, 0, 7)).EndOfWeek()
	}
	resp, err := http.Get(
		fmt.Sprintf(
			"%s/v1/pairs?groupName=%s&beginDate=%s&endDate=%s",
			cfg.ApiUrl,
			group,
			beginDate.UTC().Format("2006-01-02"),
			endDate.UTC().Format("2006-01-02"),
		),
	)
	if err != nil {
		panic(err)
	}
	result, err := io.ReadAll(resp.Body)
	if err != nil {

	}
	log.Println(string(result))
}

func (bot TableBot) processDefaultMessage(msg *tgbotapi.Message) tgbotapi.MessageConfig {
	match, err := regexp.MatchString(`(?i)Пары \S{1,} на неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		//bot.findAndSendPairsForWeek()
	}
	return tgbotapi.NewMessage(1, "!23")
}

func (TableBot) processCommandMessage(msg *tgbotapi.Message) tgbotapi.MessageConfig {
	replyMsg := tgbotapi.NewMessage(msg.Chat.ID, "")
	switch msg.Command() {
	case "start":
		replyMsg.Text = "Добро пожаловать в неофициального бота расписания ШГПУ"
		replyMsg.ReplyMarkup = kb
	case "":
		replyMsg.Text = "Неизвестная команда"
	}

	return replyMsg
}

func (bot TableBot) StartHandling(uc tgbotapi.UpdateConfig, answers chan<- tgbotapi.MessageConfig) {
	if bot.TgApi == nil {
		panic("bot api is empty")
	}
	bot.updates = bot.TgApi.GetUpdatesChan(uc)
	for update := range bot.updates {
		if update.Message != nil {
			var msg tgbotapi.MessageConfig
			if update.Message.IsCommand() {
				msg = bot.processCommandMessage(update.Message)

			} else {
				msg = bot.processDefaultMessage(update.Message)
			}
			answers <- msg
		}
	}
}

func (bot TableBot) SendMessage(msg tgbotapi.MessageConfig) {
	_, err := bot.TgApi.Send(msg)
	if err != nil {
		log.Print(err)
	}
}

func (bot TableBot) BroadcastNotifyMessage(rm parser.ResultMessage) {
	repository := do.MustInvoke[repository.Repository](di.Provider)
	subs, err := repository.GetTelegarmSubscirbers(rm.Faculty)
	if err != nil {

	}
	for _, sub := range *subs {
		bot.SendMessage(tgbotapi.NewMessage(int64(sub.ChatId), rm.Message))
	}
}

func New(bot *tgbotapi.BotAPI) *TableBot {
	return &TableBot{
		TgApi: bot,
	}
}
