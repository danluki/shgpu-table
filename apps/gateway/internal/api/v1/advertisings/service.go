package advertisings

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"

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

func patch(
	adminId uint32,
	advertising advertsingDto,
	services types.Services,
) (*admin.ChangeAdvertisingMessageResponse, error) {
	adv, err := services.AdminClient.ChangeAdvertisingMessage(
		context.Background(),
		&admin.ChangeAdvertisingMessageRequest{
			AdvertisingId: uint32(advertising.Id),
			Faculties:     advertising.Faculties,
			AdminId:       adminId,
		},
	)
	if err != nil {
		return nil, helpers.GetFiberErrorFromGrpcError(err)
	}

	return adv, nil
}

func getAdvertisingById(
	id uint32,
	adminId uint32,
	services types.Services,
) (*advertsingDto, error) {
	resp, err := services.AdminClient.GetAdvertisingMessage(
		context.Background(),
		&admin.GetAdvertisingMessageRequest{
			Id:      id,
			AdminId: adminId,
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

func addAdvertising(adminId uint32, dto addAdvertsingDto, services types.Services) (*admin.AddAdvertisingMessageResponse, error) {
	ts, err := time.Parse("2006-01-02T15:04:05.000Z", dto.SendDate)
	fmt.Println(dto.SendDate)
	if err != nil {
		return nil, fiber.NewError(400, "Invalid date format")
	}
	resp, err := services.AdminClient.AddAdvertisingMessage(
		context.Background(),
		&admin.AddAdvertisingMessageRequest{
			Faculties:  dto.Faculties,
			AdminId:    adminId,
			Text:       dto.Text,
			TotalCount: uint32(dto.TotalCount),
			SendDate:   timestamppb.New(ts),
		},
	)

	return resp, nil
}
