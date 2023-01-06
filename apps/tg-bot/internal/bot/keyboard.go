package bot

import (
	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
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
