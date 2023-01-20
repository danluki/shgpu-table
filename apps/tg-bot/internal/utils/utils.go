package utils

import (
	"time"

	"github.com/danilluk1/shgpu-table/apps/tg-bot/internal/dtos"
)

func ConvertPairsToHumanFormat(pairsResponse *dtos.PairsResponse) {
}

func GetMonthPossessive(month time.Month) string {
	switch month {
	case 1:
		return "января"
	case 2:
		return "февраля"
	case 3:
		return "марта"
	case 4:
		return "апреля"
	case 5:
		return "мая"
	case 6:
		return "июня"
	case 7:
		return "июля"
	case 8:
		return "августа"
	case 9:
		return "сентября"
	case 10:
		return "октября"
	case 11:
		return "ноября"
	case 12:
		return "декабря"
	default:
		return ""
	}
}

func GetWeekDay(number time.Weekday) string {
	switch number {
	case 1:
		return "Понедельник"
	case 2:
		return "Вторник"
	case 3:
		return "Среда"
	case 4:
		return "Четверг"
	case 5:
		return "Пятница"
	case 6:
		return "Суббота"
	case 7:
		return "Воскресенье"
	default:
		return ""
	}
}
