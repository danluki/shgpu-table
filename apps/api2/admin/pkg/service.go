package admin

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/api2/admin/pkg/dtos"
)

type Service interface {
	Create(ctx context.Context, name, pass string) (*dtos.AdminDto, error)
	// Validate(ctx context.Context)
	// ServiceStatus(ctx context.Context) (int, error)
}
