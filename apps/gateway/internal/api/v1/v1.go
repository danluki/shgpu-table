package apiv1

import (
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/admins"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/advertisings"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/faculties"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/groups"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/api/v1/pairs"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) fiber.Router {
	groups.Setup(router, services)
	pairs.Setup(router, services)
	admins.Setup(router, services)
	faculties.Setup(router, services)

	advertisingsGroup := router.Group("advertisings")
	advertisingsGroup.Use(middlewares.CheckAuth(services))
	advertisings.Setup(advertisingsGroup, services)
	return router
}
