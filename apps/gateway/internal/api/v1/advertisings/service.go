package advertisings

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
)

func getAll(services types.Services) (*admin.GetAdvertisingMessagesResponse, error) {
	advs, err := services.AdminClient.GetAdvertisingMessages(
		context.Background(),
		&admin.GetAdvertisingMessagesRequest{},
	)
	if err != nil {
		return nil, err
	}

	return advs, nil
}
