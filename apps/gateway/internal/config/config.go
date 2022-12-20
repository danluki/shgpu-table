package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	SentryDsn string `env:"SENTRY_DSN"`
	RedisUrl  string `env:"REDIS_URL"`
}

var config AppConfig

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		panic("can't parser .env variables")
	}

	err = cleanenv.ReadEnv(&config)
	if err != nil {
		panic("error in .env file")
	}
}

func GetSentryDsn() string {
	return config.SentryDsn
}

func GetRedisUrl() string {
	return config.RedisUrl
}
