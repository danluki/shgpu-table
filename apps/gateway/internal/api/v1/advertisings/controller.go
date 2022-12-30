package advertisings

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	router.Get("", getAdvertisings(services))
}

func getAdvertisings(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		// c.Request().Header

		advs, err := getAll(services)
		if err != nil {
			return err
		}

		return c.JSON(advs)
	}
}
