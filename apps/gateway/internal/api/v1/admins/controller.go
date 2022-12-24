package admins

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middlewares := router.Group("admins")
	middlewares.Post("login", postLogin(services))
	middlewares.Post("refresh", postRefresh(services))
	middlewares.Post("logout", postLogout(services))
}

func postLogin(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		dto := &loginDto{}
		err := middlewares.ValidateBody(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}
		adminDto, err := handleLogin(*dto, services)
		if err == nil {
			return c.JSON(adminDto)
		}
		return err
	}
}

func postRefresh(services types.Services) func(c *fiber.Ctx) error {

}

func postLogout(services types.Services) func(c *fiber.Ctx) error {

}
