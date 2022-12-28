package groups

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"github.com/gofiber/fiber"
)

func getGroup(groupName string, services types.Services) (*parser.GetGroupResponse, error) {
	group, err := services.ParserClient.GetGroup(context.Background(), &parser.GetGroupRequest{
		GroupName: groupName,
	})
	if err != nil {
		services.Logger.Sugar().Error(err)

		//We need to unwrap errorf
		return nil, fiber.NewError(fiber.StatusNotFound, "Can't find group")
	}

	return group, nil
}
