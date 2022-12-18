package groups

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
)

func getGroup(groupName string, services types.Services) (parser.GetGroupResponse, error) {
	group, err := services.ParserClient.GetGroup(groupName)
	if err != nil {
		services.Logger.Sugar().Error(err)

		//We need to unwrap error
		err
	}

	return group, nil
}
