package pairs

import (
	"context"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
)

func getPairsByDays(daysCount uint16, daysOffset uint16, services types.Services) {
	pairs, err := services.ParserClient.GetPairsByDays(context.Background(), {
		groupName: groupName,
		offset: daysOffset,
		count: daysCoudaysCount,
	})
}
