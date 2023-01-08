package bot

import (
	"errors"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"regexp"
)

type TableBot struct {
	TgApi *tgbotapi.BotAPI
}

func (bot TableBot) ProcessMessage(msg tgbotapi.Message) (string, error) {
	if msg.IsCommand() {
		bot.processCommandMessage(msg)
	} else {
		bot.processDefaultMessage(msg)
	}

	return "", nil
}

func (TableBot) processDefaultMessage(msg tgbotapi.Message) (*tgbotapi.MessageConfig, error) {
	if msg.IsCommand() {
		return nil, errors.New("It's a command message")
	}
	regexp.Match()
}

func (TableBot) processCommandMessage(msg tgbotapi.Message) (*tgbotapi.MessageConfig, error) {
	var replyMsg tgbotapi.MessageConfig
	replyMsg.ChatID = msg.SenderChat.ID
	if msg.IsCommand() {
		switch msg.Command() {
		case "start":
			replyMsg.ReplyMarkup = kb
			return &replyMsg, nil
		}
	} else {
		return nil, errors.New("Not a command message")
	}
}
