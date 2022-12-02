package config

import (
	"log"

	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type PostgresConfig struct {
	Host   string `env:"SQL_HOST"     env-default:"localhost"`
	Port   uint   `env:"SQL_PORT"     env-default:"5432"`
	User   string `env:"SQL_USER"     env-default:"postgres"`
	Pass   string `env:"SQL_PASSWORD" env-default:"admin"`
	DbName string `env:"SQL_DBNAME"   env-default:"shgpu-table-admin"`
}

type AppConfig struct {
	PostgresConfig PostgresConfig
	AppEnv         string `env:"APP_ENV" env-default:"production"`
	Jwt            JwtConfig
}

type JwtConfig struct {
	Secret []byte `env:"JWT_SECRET"`
}

var config AppConfig

func init() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Can't read environment variables. Working on based environment.")
	}

	err = cleanenv.ReadEnv(&config)

	if err != nil {
		log.Fatal("Error in .env file format.")
	}
}

func GetPostgresConfig() PostgresConfig {
	return config.PostgresConfig
}

func GetHost() string {
	return config.PostgresConfig.Host
}

func GetPort() uint {
	return config.PostgresConfig.Port
}

func GetUser() string {
	return config.PostgresConfig.User
}

func GetPass() string {
	return config.PostgresConfig.Pass
}

func GetDbName() string {
	return config.PostgresConfig.DbName
}

func GetEnv() string {
	return config.AppEnv
}

func GetJwtSecret() []byte {
	return config.Jwt.Secret
}
