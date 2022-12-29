package faculties

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/parser"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("faculties")
	middleware.Get("", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		faculties, err := services.ParserClient.GetFaculties(
			c.Context(),
			&parser.GetFacultiesRequest{},
		)
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "Can't get faculties")
		}

		return c.JSON(faculties)
	}
}
