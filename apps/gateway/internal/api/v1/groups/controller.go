package groups

import (
	"net/url"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("groups")
	middleware.Get(":groupName", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		groupName, err := url.QueryUnescape(c.Params("groupName"))
		if err != nil {
			return fiber.NewError(fiber.StatusBadRequest, "Bad groupName")
		}
		group, err := getGroup(groupName, services)
		if group == nil {
			return fiber.NewError(fiber.StatusNotFound, "Не удалось найти группу в базе")
		}

		if err == nil {
			return c.JSON(group)
		}

		if err != nil {
			return err
		}

		return fiber.NewError(fiber.StatusInternalServerError)
	}
}
