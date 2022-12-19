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
		//dto := &groupDto{}
		// err := middlewares.ValidateBody(
		// 	c,
		// 	services.Validator,
		// 	dto,
		// )
		// if err != nil {
		// 	return err
		// }
		groupName, err := url.QueryUnescape(c.Params("groupName"))
		if err != nil {
			return fiber.NewError(fiber.ErrBadRequest.Code, "Bad groupName")
		}

		group, err := getGroup(groupName, services)

		if err == nil {
			return c.JSON(group)
		}

		if group == nil {
			return fiber.NewError(fiber.ErrBadRequest.Code, "Can't find group with given name")
		}

		return fiber.NewError(fiber.StatusInternalServerError)
	}
}
