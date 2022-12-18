package groups

import "github.com/gofiber/fiber/v2"

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("variables")
	middleware.Get(":groupName", get(services))
}

func get(services types.Services)
