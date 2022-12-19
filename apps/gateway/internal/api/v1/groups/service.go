package groups

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
)

func getGroup(groupName string, services types.Services) (*parser.GetGroupResponse, error) {
	group, err := services.ParserClient.GetGroup(context.Background(), &parser.GetGroupRequest{
		GroupName: groupName,
	})
	if err != nil {
		services.Logger.Sugar().Error(err)

		//We need to unwrap error
		return nil, err
	}

	return group, nil
}
