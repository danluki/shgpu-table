package types

import (
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"github.com/danilluk1/shgpu-table/libs/pubsub"
	"github.com/go-playground/validator/v10"
	"go.uber.org/zap"
)

type Services struct {
	Validator    *validator.Validate
	Logger       *zap.Logger
	ParserClient parser.ParserClient
	AdminClient  admin.AdminClient
	PubSub       *pubsub.PubSub
	Events       chan string
	Advertisings chan string
}
