package advertisings

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/gofiber/fiber/v2"
)

type Token struct {
	Id           uint  `mapstructure:"id"  json:"id"`
	IssuedAtRaw  int64 `mapstructure:"iat" json:"iat"`
	ExpiresAtRaw int64 `mapstructure:"exp" json:"exp"`
}

func Setup(router fiber.Router, services types.Services) {
	router.Get("", getAdvertisings(services))
}

func getAdvertisings(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		creditionals := c.Locals("admin")
		if creditionals == nil {
			return fiber.NewError(403, "Unauthorized")
		}
		admin, ok := creditionals.(*admin.ValidateResponse)
		if !ok {
			return fiber.NewError(403, "Invalid creditionals")
		}
		advs, err := getAll(uint32(admin.Id), services)

		if err != nil {
			return err
		}

		return c.JSON(advs)
	}
}
