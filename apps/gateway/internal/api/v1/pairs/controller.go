package pairs

import (
	"regexp"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("pairs")
	middleware.Get("/notify")
	middleware.Get("", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		dto := &PairsQueryDto{}
		err := middlewares.ValidateQuery(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}

		if len(dto.BeginDate) > 0 || len(dto.EndDate) > 0 {
			re := regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)
			if re.MatchString(dto.BeginDate) && re.MatchString(dto.EndDate) {
				return fiber.NewError(fiber.ErrBadRequest.Code, "Please, check the dates format")
			}

		}

		if dto.DaysCount >= 0 && dto.DaysOffset >= 0 {

		}
		return nil
	}
}
