package config

import (
	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"os"
	"path/filepath"
)

type Config struct {
	AdminPostgresUrl    string `required:"true" default:"postgres://postgres:admin@localhost:5432/shgpu_table_admin" envconfig:"ADMIN_POSTGRES_URL"`
	AppEnv              string `required:"true" default:"development" envconfig:"APP_ENV"`
	ApiUrl              string `required:"true" default:"http://localhost:3002" envconfig:"API_URL"`
	ApiUrlWs            string `required:"true" default:"ws://localhost:3002" envconfig:"API_URL_ws"`
	JwtSecret           string `required:"true" default:"CoolSecretForJWT" envconfig:"JWT_SECRET"`
	RedisUrl            string `required:"true" default:"redis://localhost:6379" envconfig:"REDIS_URL"`
	StoragePath         string `required:"true" default:"/home/danluki/Projects/shgpu-table/apps/parser/storage/"`
	MainbasePostgresUrl string `required:"true" default:"postgres://postgres:admin@localhost:5432/shgpu_table" envconfig:"MAINBASE_POSTGRES_URL"`
	TgbotPostgresUrl    string `required:"true" default:"postgres://postgres:admin@localhost:5433/shgpu_table_bot" envconfig:"TGBOT_POSTGRES_URL"`
}

func New() (*Config, error) {
	var newCfg Config
	var err error

	wd, err := os.Getwd()
	if err != nil {
		return nil, err
	}

	wd = filepath.Join(wd, "..", "..")
	envPath := filepath.Join(wd, ".env")
	_ = godotenv.Load(envPath)

	if err = envconfig.Process("", &newCfg); err != nil {
		return nil, err
	}

	return &newCfg, nil
}
