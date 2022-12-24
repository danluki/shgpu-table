package admins

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
)

func handleLogin(dto loginDto, services types.Services) (*adminDto, error) {
	admin, err := services.AdminClient.Validate(context.Background(), &admin.ValidateRequest{
		Name: dto.Login,
		Pass: dto.Pass,
	})
	if err != nil {
		return nil, err
	}

	return &adminDto{
		Name:         admin.Name,
		Id:           admin.Id,
		RefreshToken: admin.RefreshToken,
		AccessToken:  admin.AccessToken,
	}, nil
}

func handleRefresh(dto refreshDto, services types.Services) () {
	_, err := services.AdminClient.Refresh(context.Background(), &admin.RefreshRequest{
		RefreshToken: ,
	})
}