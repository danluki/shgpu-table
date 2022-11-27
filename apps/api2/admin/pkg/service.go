package admin

import (
	"context"	
)

type Admin interface {
	Create(ctx context.Context, name, pass string)
	Validate(ctx context.Context, )
	ServiceStatus(ctx context.Context) (int, error)
}