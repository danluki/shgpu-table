package pairs

import (
	"context"
	"time"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func getPairsByDays(daysCount uint16, daysOffset uint16, services types.Services) {
	// pairs, err := services.ParserClient.GetPairsByDays(context.Background(), {
	// 	groupName: groupName,
	// 	offset: daysOffset,
	// 	count: daysCoudaysCount,
	// })
}

func getPairsByDates(
	groupName string,
	begin time.Time,
	end time.Time,
	services types.Services,
) (interface{}, error) {
	pairs, err := services.ParserClient.GetPairsByDates(
		context.Background(),
		&parser.GetPairsByDatesRequest{
			GroupName: groupName,
			DateBegin: timestamppb.New(begin),
			DateEnd:   timestamppb.New(end),
		},
	)
	if err != nil {
		return nil, err
	}

	return pairs, nil
}
