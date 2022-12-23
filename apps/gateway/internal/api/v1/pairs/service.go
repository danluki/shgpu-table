package pairs

import (
	"context"
	"time"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func getPairsByDays(
	groupName string,
	daysCount int32,
	daysOffset int32,
	services types.Services,
) (interface{}, error) {
	pairs, err := services.ParserClient.GetPairsByDays(
		context.Background(),
		&parser.GetPairsByDaysRequest{
			GroupName: groupName,
			Offset:    daysOffset,
			Count:     daysCount,
		},
	)

	if err != nil {
		//TODO: Error handler system
		return nil, err
	}

	return pairs, nil
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

func getPairsByInstructor(
	instructor string,
	begin time.Time,
	end time.Time,
	services types.Services,
) (interface{}, error) {
	pairs, err := services.ParserClient.GetPairsByLectuer(
		context.Background(),
		&parser.GetPairsByLectuerRequest{
			LectuerName: instructor,
			WeekBegin:   timestamppb.New(begin),
			WeekEnd:     timestamppb.New(end),
		},
	)
	if err != nil {
		return nil, err
	}

	return pairs, err
}
