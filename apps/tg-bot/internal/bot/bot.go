package bot

import (
	"log"
	"regexp"
	"strings"

	// "regexp"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/api"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/di"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/parser"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/repository"
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"github.com/samber/do"
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

//		return "", nil
//	}

// Возращать через канал, а не массив
func (bot TableBot) processDefaultMessage(msg *tgbotapi.Message) []tgbotapi.MessageConfig {
	repo := do.MustInvoke[repository.Repository](di.Provider)
	resMessages := make([]tgbotapi.MessageConfig, 7)
	match, err := regexp.MatchString(`(?i)Подпиши на \S+`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			resMessages = append(resMessages, tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			))
		}
		if sub != nil {
			return []tgbotapi.MessageConfig{
				tgbotapi.NewMessage(
					msg.Chat.ID,
					"Вы уже подписаны на одну из групп",
				),
			}
		}

		group := strings.Split(msg.Text, " ")[2]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
		}
		if groupDto == nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
		}
		err = repo.AddNewSubscriber(msg.Chat.ID, groupDto.GroupName, groupDto.FacultyId)
		if err != nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
		}

		return tgbotapi.NewMessage(
			msg.Chat.ID,
			"Вы успешно подписались на группу",
		)
	}

	match, err = regexp.MatchString(`(?i)Забудь меня`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось отписаться, внутренняя ошибка сервера",
			)
		}
		if sub == nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Вы не подписаны не на одну из групп",
			)
		}

		err = repo.RemoveSubscriber(msg.Chat.ID)
		if err != nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось отписаться, внутренняя ошибка сервера",
			)
		}

		return tgbotapi.NewMessage(
			msg.Chat.ID,
			"Вы успешно отписались",
		)
	}

	match, err = regexp.MatchString(`(?i)Пары \S{1,} на неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		group := strings.Split(msg.Text, " ")[1]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
		}
		if groupDto == nil {
			return tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
		}
		pairs, err := api.FindPairsForWeek(group, true)
		if err != nil {
			return tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
		}
		for day, pair := range pairs.Pairs {
			curDay := 0
			if curDay != day {
				return t
			}
		}
		return tgbotapi.NewMessage(msg.Chat.ID, pairs.Faculty.Name)
	}
	match, err = regexp.MatchString(`(?i)Пары на неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		//group := strings.Split(msg.Text, " ")[1]
		//bot.findPairsForWeek(group, true)
	}

	if len(resMessages) == 0 {
		resMessages = append(resMessages, tgbotapi.NewMessage(msg.From.ID, "Я вас не понимаю"))
	}

	return resMessages
}

func (TableBot) processCommandMessage(msg *tgbotapi.Message) tgbotapi.MessageConfig {
	replyMsg := tgbotapi.NewMessage(msg.Chat.ID, "Неизвестная команда")
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
	//if msg.Text == "" {
	//	panic("Empty message text passed")
	//}
	_, err := bot.TgApi.Send(msg)
	if err != nil {
		log.Print(err)
	}
}

func (bot TableBot) BroadcastNotifyMessage(rm parser.ResultMessage) {
	repository := do.MustInvoke[repository.Repository](di.Provider)
	subs, err := repository.GetTelegramSubscribers(rm.Faculty)
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
