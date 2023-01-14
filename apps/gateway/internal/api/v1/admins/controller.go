package admins

import (
	"fmt"
	"time"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
)

func Setup(router fiber.Router, services types.Services) {
	mw := router.Group("admins")
	mw.Post("login", postLogin(services))
	mw.Post("refresh", postRefresh(services))
	mw.Get("logout", getLogout(services))
	mw.Get("", middlewares.CheckAuth(services), get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		admin, err := getAdmin(refreshToken, services)
		if err != nil {
			return err
		}

		return c.JSON(admin)
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
		if err != nil {
			return err
		}

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
}

func postRefresh(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		if refreshToken == "" {
			return fiber.NewError(401, "No refresh token")
		}
		fmt.Println(refreshToken)
		refreshResp, err := handleRefresh(refreshToken, services)
		if err != nil {
			return err
		}
		cookie := new(fiber.Cookie)
		cookie.Name = "refresh_token"
		cookie.Value = refreshResp.RefreshToken
		cookie.HTTPOnly = true
		cookie.Expires = time.Now().Add(24 * 30 * time.Hour)
		c.Cookie(cookie)
		return c.JSON(struct {
			AccessToken string `validate:"required" json:"access_token"`
		}{
			AccessToken: refreshResp.AccessToken,
		})
	}
}

func getLogout(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		refreshToken := c.Cookies("refresh_token")
		fmt.Println(refreshToken)
		err := handleLogout(refreshToken, services)
		if err != nil {
			return err
		}
		c.ClearCookie("refresh_token")
		return c.SendStatus(fiber.StatusOK)
	}
}
