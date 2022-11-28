package admin

import (
	"context"
	"time"

	"github.com/go-kit/log"
	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
)

func NewLoggingMiddleware(logger log.Logger, next Service) logmw {
	return logmw{logger, next}
}

type logmw struct {
	logger log.Logger
	Service
}

func (mw logmw) Create(ctx context.Context, name, pass string) (*dtos.AdminDto, error) {
	defer func(begin time.Time) {
		_ = mw.logger.Log(
			"method", "create",
			"input", "email",
			"err", "err",
			"took", time.Since(begin),
		)
	}(time.Now())

	return mw.Service.Create(ctx, name, pass)
}
