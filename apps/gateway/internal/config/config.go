package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type AppConfig struct {
	SentryDsn string `env:"SENTRY_DSN" default:"https://bc2f6e9df70f49cf898b98d6604244e0@o4504338707644416.ingest.sentry.io/4504338709807104"`
	RedisUrl  string `env:"REDIS_URL" default:"redis://redis:6379"`
}

var config AppConfig

func init() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	err = cleanenv.ReadEnv(&config)
	if err != nil {
		panic(err)
	}
}

func GetSentryDsn() string {
	return config.SentryDsn
}

func GetRedisUrl() string {
	return config.RedisUrl
}
