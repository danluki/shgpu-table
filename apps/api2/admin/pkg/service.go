package admin

import (
	"context"	
)

type Admin interface {
	
	Validate(ctx context.Context, )
	ServiceStatus(ctx context.Context) (int, error)
}