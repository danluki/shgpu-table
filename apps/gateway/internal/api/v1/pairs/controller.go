package pairs

import (
	"time"

	"github.com/danilluk1/shgpu-table/apps/gateway/internal/middlewares"
	"github.com/danilluk1/shgpu-table/apps/gateway/internal/types"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func Setup(router fiber.Router, services types.Services) {
	middleware := router.Group("pairs")
	middleware.Get("/notify", websocket.New(wsHandler(services)))
	middleware.Get("", get(services))
}

func get(services types.Services) func(c *fiber.Ctx) error {
	return func(c *fiber.Ctx) error {
		dto := &PairsQueryDto{}
		err := middlewares.ValidateQuery(
			c,
			services.Validator,
			dto,
		)
		if err != nil {
			return err
		}

		if len(dto.BeginDate) > 0 || len(dto.EndDate) > 0 {
			beginDate, _ := time.Parse("2006-01-02", dto.BeginDate)
			if err != nil {
				return fiber.NewError(
					fiber.ErrBadRequest.Code,
					"Please, check the beginDate format",
				)
			}
			endDate, _ := time.Parse("2006-01-02", dto.EndDate)
			if err != nil {
				return fiber.NewError(fiber.ErrBadRequest.Code, "Please, check the endDate format")
			}

			if dto.Instructor != "" {
				pairs, err := getPairsByInstructor(
					dto.Instructor,
					beginDate,
					endDate,
					services,
				)
				if err != nil {
					return err
				}
				return c.JSON(pairs)
			}

			pairs, err := getPairsByDates(
				dto.GroupName,
				beginDate,
				endDate,
				services,
			)

			if err != nil {
				return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
			}
			return c.JSON(pairs)
		}

		if dto.DaysCount > 0 {
			pairs, err := getPairsByDays(
				dto.GroupName,
				int32(dto.DaysCount),
				int32(dto.DaysOffset),
				services,
			)

			if err != nil {
				return fiber.NewError(fiber.ErrBadRequest.Code, err.Error())
			}
			return c.JSON(pairs)
		}

		return nil
	}
}

func wsHandler(services types.Services) func(*websocket.Conn) {
	return func(c *websocket.Conn) {
		for {
			event := <-services.Events
			if err := c.WriteMessage(websocket.TextMessage, []byte(event)); err != nil {
				break
			}
		}
	}
}

func OnNewTableCB(services types.Services, data string) {
	services.Events <- data
}
