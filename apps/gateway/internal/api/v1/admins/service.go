package admins

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/helpers"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
)

func getAdmin(refreshToken string, services types.Services) (*admin.GetAdminResponse, error) {
	adminResp, err := services.AdminClient.GetAdmin(context.Background(), &admin.GetAdminRequest{
		RefreshToken: refreshToken,
	})
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return &admin.GetAdminResponse{
		Name: adminResp.Name,
		Id:   adminResp.Id,
	}, nil
}

func handleLogin(dto loginDto, services types.Services) (*adminDto, error) {
	admin, err := services.AdminClient.Login(context.Background(), &admin.LoginRequest{
		Name: dto.Login,
		Pass: dto.Pass,
	})
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return &adminDto{
		Name:         admin.Name,
		Id:           admin.Id,
		RefreshToken: admin.RefreshToken,
		AccessToken:  admin.AccessToken,
	}, nil
}

func handleRefresh(refreshToken string, services types.Services) (*refreshResponseDto, error) {
	admin, err := services.AdminClient.Refresh(context.Background(), &admin.RefreshRequest{
		RefreshToken: refreshToken,
	})
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return &refreshResponseDto{
		RefreshToken: admin.RefreshToken,
		AccessToken:  admin.AccessToken,
	}, nil
}

func handleLogout(refreshToken string, services types.Services) error {
	_, err := services.AdminClient.Logout(context.Background(), &admin.LogoutRequest{
		RefreshToken: refreshToken,
	})
	if err != nil {
		return helpers.GetFiberErrorFromGrpcError(err)
	}

	return nil
}
