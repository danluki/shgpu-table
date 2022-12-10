package config

import (
	"log"

	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type ParserConfig struct {
	RedisUrl string `env:"REDIS_URL" env-default:"redis://localhost/"`
}

var config ParserConfig

func init() {
	err := godotenv.Load(".env")

	err = cleanenv.ReadEnv(&config)
	if err != nil {
		log.Fatal("error in .env format")
	}

}

func GetRedisUrl() string {
	return config.RedisUrl
}
