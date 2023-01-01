package admins

import (
	"time"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middlewares := router.Group("admins")
	middlewares.Post("login", postLogin(services))
	middlewares.Post("refresh", postRefresh(services))
	middlewares.Post("logout", postLogout(services))
	middlewares.Get("", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		getAdmin()
	}
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
			cookie := new(fiber.Cookie)
			cookie.Name = "refresh_token"
			cookie.Value = adminDto.RefreshToken
			cookie.Expires = time.Now().Add(24 * 30 * time.Hour)
			c.Cookie(cookie)

			return c.JSON(struct {
				Name        string `validate:"required" json:"name"`
				Id          uint32 `validate:"required" json:"id"`
				AccessToken string `validate:"required" json:"access_token"`
			}{
				Name:        adminDto.Name,
				AccessToken: adminDto.AccessToken,
				Id:          adminDto.Id,
			})
		}

		return err
	}
}

func postRefresh(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		refreshResp, err := handleRefresh(refreshToken, services)
		if err != nil {
			return err
		}
		cookie := new(fiber.Cookie)
		cookie.Name = "refresh_token"
		cookie.Value = refreshResp.RefreshToken
		cookie.Expires = time.Now().Add(24 * 30 * time.Hour)
		c.Cookie(cookie)
		return c.JSON(struct {
			AccessToken string `validate:"required" json:"access_token"`
		}{
			AccessToken: refreshResp.AccessToken,
		})
	}
}

func postLogout(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		err := handleLogout(refreshToken, services)
		if err != nil {
			return err
		}
		c.ClearCookie("refresh_token")
		return c.SendStatus(fiber.StatusOK)
	}
}
