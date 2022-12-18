package groups

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("variables")
	middleware.Get(":groupName", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		dto := &groupDto{}
		err := middlewares.ValidateBody(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}

		group, err := getGroup(c.Params["groupName"], dto, services)
		if err == nil {
			return c.JSON(group)
		}

		return err
	}
}
