package bot

import (
	"log"

	// "regexp"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type TableBot struct {
	TgApi   *tgbotapi.BotAPI
	updates tgbotapi.UpdatesChannel
}

// func (bot TableBot) ProcessMessage(msg tgbotapi.Message) (string, error) {
// 	if msg.IsCommand() {
// 		bot.processCommandMessage(msg)
// 	} else {
// 		bot.processDefaultMessage(msg)
// 	}

// 	return "", nil
// }

func (TableBot) processDefaultMessage(msg *tgbotapi.Message) tgbotapi.MessageConfig {
	// regexp.Match()
	return tgbotapi.NewMessage(1, "tete")
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
		//tell users about error
		log.Print(err)
	}
}

func (bot TableBot) BroadcastNotifyMessage(parser.ResultMessage) {
	repository := do.MustInvoke[repository.Repository](di.Provider)
	subs := repository.GetSubscirbers()
}

func New(bot *tgbotapi.BotAPI) *TableBot {
	return &TableBot{
		TgApi: bot,
	}
}
