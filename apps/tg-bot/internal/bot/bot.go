package bot

import (
	"fmt"
	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/utils"
	"github.com/jinzhu/now"
	"log"
	"regexp"
	"strings"
	"time"

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

func (bot TableBot) processDefaultMessage(msg *tgbotapi.Message, answers chan<- tgbotapi.MessageConfig) {
	repo := do.MustInvoke[repository.Repository](di.Provider)
	match, err := regexp.MatchString(`(?i)Подпиши на \S+`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
			return
		}
		if sub != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Вы уже подписаны на одну из групп",
			)
			return
		}

		group := strings.Split(msg.Text, " ")[2]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
			return
		}
		if groupDto == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
			return
		}
		err = repo.AddNewSubscriber(msg.Chat.ID, groupDto.GroupName, groupDto.FacultyId)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
			return
		}

		answers <- tgbotapi.NewMessage(
			msg.Chat.ID,
			"Вы успешно подписались на группу",
		)
		return
	}

	match, err = regexp.MatchString(`(?i)Забудь меня`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось отписаться, внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Вы не подписаны не на одну из групп",
			)
			return
		}

		err = repo.RemoveSubscriber(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось отписаться, внутренняя ошибка сервера",
			)
			return
		}

		answers <- tgbotapi.NewMessage(
			msg.Chat.ID,
			"Вы успешно отписались",
		)
		return
	}

	match, err = regexp.MatchString(`(?i)Пары \S+ на неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		group := strings.Split(msg.Text, " ")[1]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
			return
		}
		if groupDto == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
			return
		}
		pairs, err := api.FindPairsForWeek(group, true)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на неделю")
			return
		}
		for i := 0; i < 6; i++ {
			pbg, _ := now.Parse(pairs.Pairs[0].Date)
			weekBegin := now.With(pbg).BeginningOfWeek()
			date := now.With(weekBegin.AddDate(0, 0, i))
			curDayString := fmt.Sprintf("%s, %d %s\r\n",
				utils.GetWeekDay(time.Weekday(i+1)),
				date.Day(),
				utils.GetMonthPossessive(date.Month()))
			for _, pair := range pairs.Pairs {
				if int(pair.Day) == i+1 {
					curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
				}
			}
			answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
		}
		return
	}
	match, err = regexp.MatchString(`(?i)Пары на неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Сначала подпишитесь на одну из групп",
			)
			return
		}
		pairs, err := api.FindPairsForWeek(sub.GroupName, true)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на неделю")
			return
		}
		for i := 0; i < 6; i++ {
			pbg, _ := now.Parse(pairs.Pairs[0].Date)
			weekBegin := now.With(pbg).BeginningOfWeek()
			date := now.With(weekBegin.AddDate(0, 0, i))
			curDayString := fmt.Sprintf("%s, %d %s\r\n",
				utils.GetWeekDay(time.Weekday(i+1)),
				date.Day(),
				utils.GetMonthPossessive(date.Month()))
			for _, pair := range pairs.Pairs {
				if int(pair.Day) == i+1 {
					curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
				}
			}
			answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
		}
		return
	}
	match, err = regexp.MatchString(`(?i)Пары \S+ на след неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		group := strings.Split(msg.Text, " ")[1]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось подписаться на группу, внутренняя ошибка сервера",
			)
			return
		}
		if groupDto == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
			return
		}
		pairs, err := api.FindPairsForWeek(group, false)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на следущую неделю")
			return
		}
		for i := 0; i < 6; i++ {
			pbg, _ := now.Parse(pairs.Pairs[0].Date)
			weekBegin := now.With(pbg).BeginningOfWeek()
			date := now.With(weekBegin.AddDate(0, 0, i))
			curDayString := fmt.Sprintf("%s, %d %s\r\n",
				utils.GetWeekDay(time.Weekday(i+1)),
				date.Day(),
				utils.GetMonthPossessive(date.Month()))
			for _, pair := range pairs.Pairs {
				if int(pair.Day) == i+1 {
					curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
				}
			}
			answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
		}
		return
	}
	match, err = regexp.MatchString(`(?i)Пары на след неделю`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Сначала подпишитесь на одну из групп",
			)
			return
		}
		pairs, err := api.FindPairsForWeek(sub.GroupName, false)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на следущую неделю")
			return
		}
		for i := 0; i < 6; i++ {
			pbg, _ := now.Parse(pairs.Pairs[0].Date)
			weekBegin := now.With(pbg).BeginningOfWeek()
			date := now.With(weekBegin.AddDate(0, 0, i))
			curDayString := fmt.Sprintf("%s, %d %s\r\n",
				utils.GetWeekDay(time.Weekday(i+1)),
				date.Day(),
				utils.GetMonthPossessive(date.Month()))
			for _, pair := range pairs.Pairs {
				if int(pair.Day) == i+1 {
					curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
				}
			}
			answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
		}
		return
	}
	match, err = regexp.MatchString(`(?i)Звонки`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		answers <- tgbotapi.NewMessage(msg.Chat.ID, fmt.Sprintf("🕗 %d пара %s\r\n🕗 %d пара %s\r\n🕗 %d пара %s\r\n🕗 %d пара %s\r\n🕗 %d пара %s\r\n🕗 %d пара %s",
			1, "8:00 - 9:30", 2, "9:40 - 11:10", 3, "11:20 - 12:50", 4, "13:20 - 14:50", 5, "15:00 - 16:30", 6, "16:40 - 18:10"))
		return
	}
	match, err = regexp.MatchString(`(?i)Пары завтра`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Сначала подпишитесь на одну из групп",
			)
			return
		}
		pairs, err := api.FindTomorrowPairs(sub.GroupName)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на завтра")
			return
		}
		date := now.With(time.Now().AddDate(0, 0, 1))
		curDayString := fmt.Sprintf("%s, %d %s\r\n",
			utils.GetWeekDay(date.Weekday()),
			date.Day(),
			utils.GetMonthPossessive(date.Month()))
		for _, pair := range pairs.Pairs {
			curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
		}
		answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
	}
	match, err = regexp.MatchString(`(?i)Пары \S+ завтра`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		group := strings.Split(msg.Text, " ")[1]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if groupDto == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
			return
		}
		pairs, err := api.FindTomorrowPairs(groupDto.GroupName)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на завтра")
			return
		}
		date := now.With(time.Now().AddDate(0, 0, 1))
		curDayString := fmt.Sprintf("%s, %d %s\r\n",
			utils.GetWeekDay(date.Weekday()),
			date.Day(),
			utils.GetMonthPossessive(date.Month()))
		for _, pair := range pairs.Pairs {
			curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
		}
		answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
	}
	match, err = regexp.MatchString(`(?i)Пары сегодня`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Сначала подпишитесь на одну из групп",
			)
			return
		}
		pairs, err := api.FindTodayPairs(sub.GroupName)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на сегодня")
			return
		}
		date := now.With(time.Now().AddDate(0, 0, 1))
		curDayString := fmt.Sprintf("%s, %d %s\r\n",
			utils.GetWeekDay(date.Weekday()),
			date.Day(),
			utils.GetMonthPossessive(date.Month()))
		for _, pair := range pairs.Pairs {
			curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
		}
		answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
	}
	match, err = regexp.MatchString(`(?i)Пары \S+ сегодня`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		group := strings.Split(msg.Text, " ")[1]
		groupDto, err := api.FindGroupByName(group)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if groupDto == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Не удалось найти группу",
			)
			return
		}
		pairs, err := api.FindTodayPairs(groupDto.GroupName)
		if err != nil {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Не удалось получить расписание")
			return
		}
		if len(pairs.Pairs) == 0 {
			answers <- tgbotapi.NewMessage(msg.Chat.ID, "Нет информации о парах на сегодня")
			return
		}
		date := now.With(time.Now().AddDate(0, 0, 1))
		curDayString := fmt.Sprintf("%s, %d %s\r\n",
			utils.GetWeekDay(date.Weekday()),
			date.Day(),
			utils.GetMonthPossessive(date.Month()))
		for _, pair := range pairs.Pairs {
			curDayString += fmt.Sprintf("🎯🧑‍🏫️%d %s\r\n", pair.Number, pair.Name)
		}
		answers <- tgbotapi.NewMessage(msg.Chat.ID, curDayString)
	}
	match, err = regexp.MatchString(`(?i)Скачать`, msg.Text)
	if err != nil {
		panic(err)
	}
	if match {
		sub, err := repo.GetSubscriberByChatId(msg.Chat.ID)
		if err != nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Внутренняя ошибка сервера",
			)
			return
		}
		if sub == nil {
			answers <- tgbotapi.NewMessage(
				msg.Chat.ID,
				"Сначала подпишитесь на одну из групп",
			)
			return
		}
		//TODO: Change to get info from database
		switch sub.FacultyId {
		case 12:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"https://shgpi.edu.ru/struktura-universiteta/f12/raspisanie/raspisanie-ochnogo-otdelenija/",
				)
				return
			}
		case 8:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"https://shgpi.edu.ru/struktura-universiteta/f08/raspisanie/raspisanie-ochnogo-otdelenie-fpo/",
				)
				return
			}
		case 11:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/",
				)
				return
			}
		case 3:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"https://shgpi.edu.ru/struktura-universiteta/f03/raspisanie/raspisanie-ochnogo-otdelenija-ffk/",
				)
			}
		case 15:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"https://shgpi.edu.ru/struktura-universiteta/f15/raspisanie/ochnaja-forma-obuchenija/",
				)
			}
		default:
			{
				answers <- tgbotapi.NewMessage(
					msg.Chat.ID,
					"Внутренняя ошибка сервера",
				)
				return
			}

		}
	}
	answers <- tgbotapi.NewMessage(msg.From.ID, "Я вас не понимаю")
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

func (bot TableBot) StartHandling(
	uc tgbotapi.UpdateConfig,
	answers chan<- tgbotapi.MessageConfig) {
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
				bot.processDefaultMessage(update.Message, answers)
			}
			answers <- msg
		}
	}
}

func (bot TableBot) SendMessage(msg tgbotapi.MessageConfig) {
	if msg.Text == "" {
		log.Print("Empty message passed to send message")
		return
	}
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
