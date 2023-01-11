package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	TelegramKey string `env:"TELEGRAM_KEY"`
	DbConn      string `env:"DB_CONN"`
	ApiUrl      string `env:"API_URL"`
	ApiUrlWs    string `env:"API_URL_WS"`
	AppEnv      string `env:"APP_ENV"      default:"development"`
}

func New() (*AppConfig, error) {
	var config AppConfig

	err := godotenv.Load(".env")
	if err != nil {
		return nil, err
	}

	err = cleanenv.ReadEnv(&config)
	if err != nil {
		return nil, err
	}

	return &config, err
}
