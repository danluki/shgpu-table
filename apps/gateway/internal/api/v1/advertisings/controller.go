package advertisings

import (
	"strconv"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/helpers"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/danilluk1/shgpu-table/libs/grpc/generated/admin"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	router.Get("", getAdvertisings(services))
	router.Post("", postAdvertising(services))
	router.Get(":advertisingId", getAdvertising(services))
	router.Patch("", patchAdvertising(services))
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
			return helpers.GetFiberErrorFromGrpcError(err)
		}

		return c.JSON(advs)
	}
}

func patchAdvertising(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		creditionals := c.Locals("admin")
		if creditionals == nil {
			return fiber.NewError(403, "Unauthorized")
		}
		admin, ok := creditionals.(*admin.ValidateResponse)
		if !ok {
			return fiber.NewError(403, "Invalid creditionals")
		}

		dto := &advertsingDto{}
		err := middlewares.ValidateBody(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}
		if admin.Id != uint32(dto.AdminId) {
			return fiber.NewError(403, "You don't have access to this advertising")
		}

		resp, err := patch(admin.Id, *dto, services)
		if err != nil {
			return err
		}

		return c.JSON(resp.Advertising)
	}
}

func postAdvertising(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		return nil
	}
}

func getAdvertising(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		advIdStr := c.Params("advertisingId")
		advId, err := strconv.ParseUint(advIdStr, 10, 32)
		if err != nil {
			return fiber.NewError(400, "Invalid parameter")
		}
		creditionals := c.Locals("admin")
		if creditionals == nil {
			return fiber.NewError(403, "Unauthorized")
		}
		admin, ok := creditionals.(*admin.ValidateResponse)
		if !ok {
			return fiber.NewError(403, "Invalid creditionals")
		}
		advertising, err := getAdvertisingById(uint32(advId), admin.Id, services)
		if err != nil {
			return err
		}

		return c.JSON(advertising)
	}
}
