package middlewares

import (
	"strings"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/gofiber/fiber/v2"
)

var CheckAuth = func(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		if c.Locals("admin") != nil {
			return c.Next()
		}
		headers := c.GetReqHeaders()
		authToken := headers["Authorization"]
		if authToken != "" {
			tokenSlice := strings.Split(authToken, "Bearer ")
			if len(tokenSlice) < 2 {
				return fiber.NewError(401, "Invalid token format")
			}

			claims, err := services.AdminClient.Validate(c.Context(), &admin.ValidateRequest{
				AccessToken: tokenSlice[1],
			})
			if err != nil {
				return fiber.NewError(401, err.Error())
			}
			c.Locals("admin", claims)
			return c.Next()
		}

		return fiber.NewError(403, "Unauthorized")
	}
}
