package advertisings

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/helpers"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
)

func getAll(
	adminId uint32,
	services types.Services,
) (*admin.GetAdvertisingMessagesResponse, error) {
	advs, err := services.AdminClient.GetAdvertisingMessages(
		context.Background(),
		&admin.GetAdvertisingMessagesRequest{
			AdminId: adminId,
		},
	)
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return advs, nil
}

func getAdvertisingById(id uint32, services types.Services) (*advertsingDto, error) {
	resp, err := services.AdminClient.GetAdvertisingMessage(
		context.Background(),
		&admin.GetAdvertisingMessageRequest{
			Id: id,
		},
	)
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return &advertsingDto{
		Id:         uint(resp.Advertising.Id),
		Faculties:  resp.Advertising.Faculties,
		AdminId:    uint(resp.Advertising.AdminId),
		Text:       resp.Advertising.Text,
		TotalCount: uint(resp.Advertising.TotalCount),
		SendDate:   resp.Advertising.SendDate.AsTime(),
	}, nil
}
