package types

import (
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"github.com/go-playground/validator/v10"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

type Services struct {
	DB           *gorm.DB
	Validator    *validator.Validate
	Logger       *zap.Logger
	ParserClient parser.ParserClient
}
